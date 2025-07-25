-- Move http extension from public schema to extensions schema for security
CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop the extension from public schema and recreate in extensions schema
DROP EXTENSION IF EXISTS http CASCADE;
CREATE EXTENSION IF NOT EXISTS http SCHEMA extensions;