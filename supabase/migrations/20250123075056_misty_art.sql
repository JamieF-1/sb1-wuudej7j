/*
  # F-gas Compliance Database Schema

  1. New Tables
    - `technicians`
      - Stores technician information and credentials
    - `sites`
      - Stores site and client information
    - `systems`
      - Stores system details and specifications
    - `fgas_logs`
      - Main table for F-gas compliance records
    - `bottle_data`
      - Tracks refrigerant bottle information
    - `procedures`
      - Records recovery, pressure test, evacuation, and recharge data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create technicians table
CREATE TABLE IF NOT EXISTS technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  certification_number text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  address text NOT NULL,
  contact_person text,
  contact_number text,
  job_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create systems table
CREATE TABLE IF NOT EXISTS systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id),
  manufacturer text NOT NULL,
  model text NOT NULL,
  serial_number text NOT NULL,
  system_type text NOT NULL,
  capacity_kw numeric NOT NULL,
  initial_charge_kg numeric NOT NULL,
  refrigerant_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fgas_logs table
CREATE TABLE IF NOT EXISTS fgas_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id uuid REFERENCES technicians(id),
  system_id uuid REFERENCES systems(id),
  procedure_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'draft',
  signature_data text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bottle_data table
CREATE TABLE IF NOT EXISTS bottle_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fgas_log_id uuid REFERENCES fgas_logs(id),
  bottle_number text NOT NULL,
  refrigerant_type text NOT NULL,
  weight_before_kg numeric NOT NULL,
  weight_after_kg numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create procedures table
CREATE TABLE IF NOT EXISTS procedures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fgas_log_id uuid REFERENCES fgas_logs(id),
  procedure_type text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  test_pressure_bar numeric,
  test_duration_minutes integer,
  vacuum_level_ubar numeric,
  target_vacuum_level_ubar numeric,
  amount_kg numeric,
  passed boolean,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE fgas_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bottle_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Technicians can view their own data"
  ON technicians
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all sites"
  ON sites
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view all systems"
  ON systems
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Technicians can view their logs"
  ON fgas_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM technicians
    WHERE technicians.id = fgas_logs.technician_id
    AND technicians.user_id = auth.uid()
  ));

CREATE POLICY "Users can view bottle data"
  ON bottle_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view procedures"
  ON procedures
  FOR SELECT
  TO authenticated
  USING (true);

-- Create insert policies
CREATE POLICY "Technicians can insert their own data"
  ON technicians
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert sites"
  ON sites
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can insert systems"
  ON systems
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Technicians can insert logs"
  ON fgas_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM technicians
    WHERE technicians.id = fgas_logs.technician_id
    AND technicians.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert bottle data"
  ON bottle_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can insert procedures"
  ON procedures
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create update policies
CREATE POLICY "Technicians can update their own data"
  ON technicians
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update sites"
  ON sites
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can update systems"
  ON systems
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Technicians can update their logs"
  ON fgas_logs
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM technicians
    WHERE technicians.id = fgas_logs.technician_id
    AND technicians.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM technicians
    WHERE technicians.id = fgas_logs.technician_id
    AND technicians.user_id = auth.uid()
  ));

CREATE POLICY "Users can update bottle data"
  ON bottle_data
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can update procedures"
  ON procedures
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);