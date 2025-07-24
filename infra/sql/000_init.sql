-- ModernizationWebSite - Initial Database Setup
-- This script runs automatically when the PostgreSQL container starts
-- File: infra/sql/000_init.sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- UUID generation
CREATE EXTENSION IF NOT EXISTS "citext";        -- Case-insensitive text
CREATE EXTENSION IF NOT EXISTS "pg_trgm";       -- Trigram matching for text search
CREATE EXTENSION IF NOT EXISTS "hstore";        -- Key-value store
CREATE EXTENSION IF NOT EXISTS "btree_gist";    -- GiST index operator classes for B-tree data types

-- Create database schemas
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS analytics;

-- Add schema comments
COMMENT ON SCHEMA public IS 'ModernizationWebSite - Main application schema';
COMMENT ON SCHEMA auth IS 'ModernizationWebSite - Authentication and authorization';
COMMENT ON SCHEMA analytics IS 'ModernizationWebSite - Analytics and reporting';

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA analytics GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO svc;

-- Enable Row-Level Security
ALTER DATABASE modernize SET row_security = on;

-- Set search path
SET search_path TO public, auth, analytics;

-- Create custom types (if needed)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status') THEN
    CREATE TYPE project_status AS ENUM ('draft', 'analyzing', 'designing', 'complete', 'archived');
  END IF;
END$$;

-- Create functions
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Note: Actual table creation will be managed by Alembic migrations
-- This script only sets up the environment and common utilities

-- Add version tracking table for manual migrations
CREATE TABLE IF NOT EXISTS public.schema_version (
  id SERIAL PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  applied_by VARCHAR(100) NOT NULL
);

-- Insert initial version
INSERT INTO public.schema_version (version, description, applied_by)
SELECT '0.0.1', 'Initial schema setup', current_user
WHERE NOT EXISTS (SELECT 1 FROM public.schema_version WHERE version = '0.0.1');

-- Final setup message
DO $$
BEGIN
  RAISE NOTICE 'ModernizationWebSite database initialization complete';
END$$;
