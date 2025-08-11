# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Builder for both API and Panel
# ============================================================================
FROM oven/bun:1.2 AS builder
WORKDIR /app

# Install OpenSSL for Prisma and other build dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Accept build arguments
ARG TURBO_TEAM

# Copy package files first for better caching
COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/panel/package.json ./apps/panel/
COPY packages/auth/package.json ./packages/auth/
COPY packages/database/package.json ./packages/database/

# Install dependencies
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Build everything in one stage
RUN --mount=type=secret,id=turbo_token \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo db:generate --force && \
    cd apps/panel && bun run codegen && cd ../.. && \
    bun x turbo build --filter=@conductor/api --filter=@conductor/panel

# ============================================================================
# Stage 2: Production runtime with Caddy
# ============================================================================
FROM caddy:2-alpine
WORKDIR /app

# Install Node.js, Bun binary, and runtime dependencies in one layer
RUN apk add --no-cache \
    nodejs \
    npm \
    gcompat \
    libc6-compat \
    libstdc++ \
    libgcc \
    ca-certificates \
    supervisor \
    curl \
    bash && \
    curl -fsSL https://bun.sh/install | bash -s bun-v1.2.19 && \
    mv /root/.bun/bin/bun /usr/local/bin/bun && \
    chmod +x /usr/local/bin/bun && \
    rm -rf /root/.bun && \
    # Create non-root user
    addgroup -g 1001 -S conductor && \
    adduser -S conductor -u 1001 && \
    # Install Prisma CLI for migrations
    bun add prisma@^6.13.0 --no-save --ignore-scripts && \
    # Create necessary directories
    mkdir -p /app/.cache/prisma /data /config && \
    chown -R conductor:conductor /app /data /config && \
    chmod -R 755 /app

# Copy API files
COPY --from=builder --chown=conductor:conductor /app/apps/api/dist /app/api/dist
COPY --from=builder --chown=conductor:conductor /app/packages/database/generated /app/packages/database/generated
COPY --from=builder --chown=conductor:conductor /app/packages/database/prisma /app/packages/database/prisma
COPY --from=builder --chown=conductor:conductor /app/packages/database/src/seeds /app/packages/database/src/seeds
COPY --from=builder --chown=conductor:conductor /app/packages/database/prisma.config.ts /app/packages/database/prisma.config.ts

# Copy Panel files (Next.js standalone build)
COPY --from=builder --chown=conductor:conductor /app/apps/panel/.next/standalone /app/panel
COPY --from=builder --chown=conductor:conductor /app/apps/panel/.next/static /app/panel/apps/panel/.next/static
COPY --from=builder --chown=conductor:conductor /app/apps/panel/public /app/panel/apps/panel/public

# Copy configuration files
COPY --chown=conductor:conductor ./Caddyfile /etc/caddy/Caddyfile
COPY --chown=conductor:conductor ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --chown=conductor:conductor ./docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variables
ENV NODE_ENV=production \
    PRISMA_ENGINES_CACHE_DIR=/app/.cache/prisma \
    PORT=8080 \
    PANEL_PORT=3000 \
    API_PORT=4000

# Expose port (Railway will override with PORT env var)
EXPOSE 8080

# Run as conductor user
USER conductor

# Run entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]