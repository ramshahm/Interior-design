/*
# Create leads table for Interior Cost Estimator

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `name` (text, not null) — client's full name
  - `phone` (text, not null) — WhatsApp number
  - `city` (text, not null) — location/city
  - `property_type` (text, not null) — e.g. "1BHK", "2BHK", "Office"
  - `carpet_area` (integer, not null) — square footage
  - `scope_of_work` (text, not null) — selected scope
  - `finish_grade` (text, not null) — selected finish tier
  - `estimated_min` (numeric, not null) — lower bound of estimate
  - `estimated_max` (numeric, not null) — upper bound of estimate
  - `breakdown` (jsonb, not null) — itemized cost breakdown
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- Single-tenant, no-auth app: allow anon + authenticated to insert leads.
- No SELECT/UPDATE/DELETE for anon — leads are write-only from the client (submitted form data).
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  property_type text NOT NULL,
  carpet_area integer NOT NULL,
  scope_of_work text NOT NULL,
  finish_grade text NOT NULL,
  estimated_min numeric NOT NULL,
  estimated_max numeric NOT NULL,
  breakdown jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
