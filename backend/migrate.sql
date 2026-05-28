ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS table_number INTEGER;

UPDATE reservations
  SET table_number = COALESCE(table_number, 1)
  WHERE table_number IS NULL;

ALTER TABLE reservations
  ALTER COLUMN table_number SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reservations_table_number_check') THEN
    ALTER TABLE reservations
      ADD CONSTRAINT reservations_table_number_check CHECK (table_number BETWEEN 1 AND 30);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS reservations_slot_table_unique
  ON reservations (reserved_for, table_number);

