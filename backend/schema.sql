-- Minimal initial schema for CafeFausse (PostgreSQL)

CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  reserved_for TIMESTAMPTZ NOT NULL,
  table_number INTEGER NOT NULL CHECK (table_number BETWEEN 1 AND 30),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS reservations_slot_table_unique
  ON reservations (reserved_for, table_number);

CREATE TABLE IF NOT EXISTS newsletter_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

