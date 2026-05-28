import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return psycopg2.connect(
        user=os.getenv("PGUSER"),
        password=os.getenv("PGPASSWORD"),
        host=os.getenv("PGHOST", "localhost"),
        port=os.getenv("PGPORT", "5432"),
        database=os.getenv("PGDATABASE"),
    )

def show_latest(table_name):
    print(f"\n--- {table_name} ---")
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM {table_name} ORDER BY created_at DESC LIMIT 5;")
    rows = cur.fetchall()
    colnames = [desc[0] for desc in cur.description]

    if not rows:
        print("No rows found.")
    else:
        print(colnames)
        for row in rows:
            print(row)

    cur.close()
    conn.close()

if __name__ == "__main__":
    show_latest("newsletter_signups")
    show_latest("customers")
    show_latest("reservations")