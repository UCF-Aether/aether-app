set -e

supabase start
psql postgresql://postgres:postgres@localhost:54322/postgres -f aether.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f test.sql
