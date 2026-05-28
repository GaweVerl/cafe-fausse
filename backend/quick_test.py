from app import create_app


def main() -> None:
    app = create_app()
    client = app.test_client()

    r = client.post("/api/newsletter", json={"email": "customer@example.com"})
    print("POST /api/newsletter", r.status_code, r.get_json())

    r = client.post(
        "/api/reservations",
        json={
            "time_slot": "2026-07-01T19:00",
            "number_of_guests": 2,
            "customer_name": "Test Customer",
            "email_address": "test@example.com",
            "phone_number": "2025551234",
        },
    )
    print("POST /api/reservations", r.status_code, r.get_json())

    r = client.get("/api/customers")
    print("GET /api/customers", r.status_code, (r.get_json() or [])[:2])

    r = client.get("/api/reservations")
    print("GET /api/reservations", r.status_code, (r.get_json() or [])[:2])


if __name__ == "__main__":
    main()

