ALTER TABLE todo DROP COLUMN id;

ALTER TABLE todo ADD COLUMN id SERIAL PRIMARY KEY;