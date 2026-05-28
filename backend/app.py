import os
import random
import re
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS

from db import get_db_conn

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def create_app() -> Flask:
    app = Flask(__name__)

    cors_origins = os.environ.get("CORS_ORIGINS", "*")
    origins = (
        [o.strip() for o in cors_origins.split(",") if o.strip()]
        if cors_origins != "*"
        else "*"
    )
    CORS(app, resources={r"/api/*": {"origins": origins}})

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    def _json_error(message: str, status_code: int):
        return jsonify({"error": message}), status_code

    def _require_json():
        data = request.get_json(force=True, silent=True)
        if data is None:
            return None, _json_error("Request body must be JSON", 400)
        return data, None

    def _validate_email(email: str) -> bool:
        return bool(email and EMAIL_RE.match(email))

    def _parse_time_slot(value: str):
        if not value:
            return None
        # Accept "YYYY-MM-DDTHH:MM" (naive). Store as timestamptz; Postgres will interpret using server TZ.
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return None

    @app.post("/api/newsletter")
    def newsletter_signup():
        data, err = _require_json()
        if err:
            return err

        email = (data.get("email") or "").strip().lower()
        if not _validate_email(email):
            return _json_error("Invalid email address", 400)

        conn = get_db_conn()
        try:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO newsletter_signups (email)
                        VALUES (%s)
                        ON CONFLICT (email) DO NOTHING
                        """,
                        (email,),
                    )
                    cur.execute(
                        """
                        INSERT INTO customers (full_name, email, phone, newsletter_signup)
                        VALUES (%s, %s, %s, TRUE)
                        ON CONFLICT (email) DO UPDATE
                          SET full_name = EXCLUDED.full_name,
                              phone = EXCLUDED.phone,
                              newsletter_signup = TRUE
                        """,
                        ("Newsletter Subscriber", email, None),
                    )
            return jsonify({"message": "Newsletter signup successful"})
        finally:
            conn.close()

    @app.post("/api/reservations")
    def create_reservation():
        data, err = _require_json()
        if err:
            return err

        time_slot_raw = (data.get("time_slot") or "").strip()
        number_of_guests = data.get("number_of_guests")
        customer_name = (data.get("customer_name") or "").strip()
        email = (data.get("email_address") or "").strip().lower()
        phone = data.get("phone_number")

        if not time_slot_raw or not customer_name or not email or number_of_guests is None:
            return _json_error(
                "Missing required fields: time_slot, number_of_guests, customer_name, email_address",
                400,
            )

        dt = _parse_time_slot(time_slot_raw)
        if dt is None:
            return _json_error("Invalid time_slot format. Use ISO like 2026-07-01T19:00", 400)

        if not _validate_email(email):
            return _json_error("Invalid email address", 400)

        try:
            number_of_guests_int = int(number_of_guests)
        except (TypeError, ValueError):
            return _json_error("number_of_guests must be an integer", 400)

        if number_of_guests_int < 1:
            return _json_error("number_of_guests must be at least 1", 400)

        conn = get_db_conn()
        try:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO customers (full_name, email, phone, newsletter_signup)
                        VALUES (%s, %s, %s, FALSE)
                        ON CONFLICT (email) DO UPDATE
                          SET full_name = EXCLUDED.full_name,
                              phone = EXCLUDED.phone
                        RETURNING id
                        """,
                        (customer_name, email, phone),
                    )
                    customer_id = cur.fetchone()[0]

                    cur.execute(
                        "SELECT table_number FROM reservations WHERE reserved_for = %s",
                        (dt,),
                    )
                    booked = {row[0] for row in cur.fetchall()}
                    available = [n for n in range(1, 31) if n not in booked]
                    if not available:
                        return _json_error("That time slot is fully booked", 409)

                    table_number = random.choice(available)

                    cur.execute(
                        """
                        INSERT INTO reservations (customer_id, party_size, reserved_for, table_number)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id
                        """,
                        (customer_id, number_of_guests_int, dt, table_number),
                    )
                    reservation_id = cur.fetchone()[0]

            return jsonify(
                {
                    "message": "Reservation created successfully",
                    "reservation_id": reservation_id,
                    "table_number": table_number,
                    "time_slot": time_slot_raw,
                }
            )
        finally:
            conn.close()

    @app.get("/api/customers")
    def list_customers():
        conn = get_db_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, full_name, email, phone, newsletter_signup, created_at
                    FROM customers
                    ORDER BY created_at DESC
                    """
                )
                rows = cur.fetchall()
            return jsonify(
                [
                    {
                        "customer_id": r[0],
                        "customer_name": r[1],
                        "email_address": r[2],
                        "phone_number": r[3],
                        "newsletter_signup": r[4],
                        "created_at": r[5].isoformat() if r[5] else None,
                    }
                    for r in rows
                ]
            )
        finally:
            conn.close()

    @app.get("/api/reservations")
    def list_reservations():
        conn = get_db_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                      r.id AS reservation_id,
                      r.customer_id,
                      c.full_name,
                      c.email,
                      r.reserved_for,
                      r.party_size,
                      r.table_number,
                      r.created_at
                    FROM reservations r
                    LEFT JOIN customers c ON c.id = r.customer_id
                    ORDER BY r.created_at DESC
                    """
                )
                rows = cur.fetchall()
            return jsonify(
                [
                    {
                        "reservation_id": r[0],
                        "customer_id": r[1],
                        "customer_name": r[2],
                        "email_address": r[3],
                        "time_slot": r[4].isoformat() if r[4] else None,
                        "number_of_guests": r[5],
                        "table_number": r[6],
                        "created_at": r[7].isoformat() if r[7] else None,
                    }
                    for r in rows
                ]
            )
        finally:
            conn.close()

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="127.0.0.1", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
