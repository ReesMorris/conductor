#!/bin/bash

# Load development environment variables from root
if [ -f .env.development ]; then
  set -a
  source .env.development
  set +a
fi

# Function to handle cleanup
cleanup() {
  echo ""
  echo "Shutting down..."
  docker compose down
  exit 0
}

# Set up trap to catch SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start Docker Compose in the background
echo "Starting Docker services..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until docker compose exec -T postgres pg_isready -U conductor > /dev/null 2>&1; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
until docker compose exec -T minio mc ready local > /dev/null 2>&1; do
  sleep 1
done
echo "MinIO is ready!"

# Wait for Caddy to be ready
echo "Waiting for Caddy to be ready..."
until docker compose exec -T caddy caddy version > /dev/null 2>&1; do
  sleep 1
done
echo "Caddy is ready!"

# Run database migrations
echo "Running database migrations..."
yarn db:push --filter=@conductor/database >/dev/null 2>&1 && echo "✓ Database ready"

# Start Turbo dev
echo "Starting applications..."
echo "→ Access Conductor at http://localhost:${PORT:-8080}"
echo ""
turbo dev

# If turbo exits normally, still clean up
cleanup