import os
from typing import Optional

import psycopg2
from dotenv import load_dotenv
from psycopg2.extensions import connection as PgConnection


load_dotenv()


def get_db_conn(database_url: Optional[str] = None) -> PgConnection:
    """
    Connect using DATABASE_URL if present, otherwise discrete PG* vars.
    """
    url = database_url or os.environ.get("DATABASE_URL")
    if url:
        return psycopg2.connect(url)

    host = os.environ.get("PGHOST", "localhost")
    port = int(os.environ.get("PGPORT", "5432"))
    user = os.environ.get("PGUSER")
    password = os.environ.get("PGPASSWORD")
    dbname = os.environ.get("PGDATABASE")

    missing = [k for k, v in {"PGUSER": user, "PGPASSWORD": password, "PGDATABASE": dbname}.items() if not v]
    if missing:
        raise RuntimeError(
            "Missing database environment variables. Set DATABASE_URL or: "
            + ", ".join(missing)
        )

    return psycopg2.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        dbname=dbname,
    )

