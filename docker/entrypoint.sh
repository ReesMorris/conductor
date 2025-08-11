#!/bin/sh
set -e

echo "Starting Conductor..."

# Run database migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
    echo "Running database migrations..."
    cd /app/packages/database
    bun x prisma migrate deploy || echo "Migration failed or no migrations to run"
    
    # Optionally seed the database (controlled by SEED_DATABASE env var)
    if [ "$SEED_DATABASE" = "true" ]; then
        echo "Seeding database..."
        cd /app/packages/database/prisma && bun run seed.ts || echo "Database seeding failed (may already be seeded)"
    fi
    
    cd /app
fi

# Start supervisor to manage all processes
echo "Starting services..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf