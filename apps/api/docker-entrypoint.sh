#!/bin/sh
set -e

echo "Starting container initialization..."

# Ensure DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable is not set"
  exit 1
fi

# Run database migrations
echo "Running database migrations..."
bunx prisma migrate deploy --schema=/app/packages/database/prisma/schema.prisma

if [ $? -eq 0 ]; then
  echo "Migrations completed successfully"
else
  echo "Migration failed"
  exit 1
fi

# Seed database
echo "Seeding database..."
cd /app/packages/database/prisma && bun run seed.ts

if [ $? -eq 0 ]; then
  echo "Database seeded successfully"
else
  echo "Database seeding failed"
  exit 1
fi

# Start the API server
echo "Starting API server..."
exec bun run /app/dist/index.js