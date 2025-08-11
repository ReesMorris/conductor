#!/bin/sh
set -e

echo "Starting Conductor..."

# Run database migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
    echo "Running database migrations..."
    cd /app/packages/database
    bun x prisma migrate deploy || echo "Migration failed or no migrations to run"
    cd /app
fi

# Start supervisor to manage all processes
echo "Starting services..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf