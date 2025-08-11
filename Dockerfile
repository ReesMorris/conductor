# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Prune the monorepo to get all dependencies
# ============================================================================
FROM oven/bun:1.2 AS pruner
WORKDIR /app

# Install turbo for monorepo pruning
COPY package.json ./
RUN bun add turbo --no-save --ignore-scripts

# Copy entire monorepo
COPY . .

# ============================================================================
# Stage 2: Build the API
# ============================================================================
FROM oven/bun:1.2 AS api-builder
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Accept build arguments
ARG TURBO_TEAM

# Copy entire monorepo structure and install dependencies
COPY --from=pruner /app .
RUN bun install --frozen-lockfile --ignore-scripts

# Generate Prisma client and build the API
RUN --mount=type=secret,id=turbo_token \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo db:generate --force && \
    bun x turbo build --filter=@conductor/api

# ============================================================================
# Stage 3: Build the Panel
# ============================================================================
FROM oven/bun:1.2 AS panel-builder
WORKDIR /app

# Accept build arguments
ARG TURBO_TEAM

# Copy entire monorepo structure and install dependencies
COPY --from=pruner /app .
RUN bun install --frozen-lockfile --ignore-scripts

# Build the panel (Next.js app)
RUN --mount=type=secret,id=turbo_token \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo build --filter=@conductor/panel

# ============================================================================
# Stage 4: Production runtime with Caddy
# ============================================================================
FROM caddy:2-alpine
WORKDIR /app

# Install Node.js, Bun binary, and runtime dependencies
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
    rm -rf /root/.bun

# Create non-root user for running services
RUN addgroup -g 1001 -S conductor && \
    adduser -S conductor -u 1001

# Install Prisma CLI for migrations
RUN bun add prisma@^6.13.0 --no-save --ignore-scripts

# Copy API files
COPY --from=api-builder --chown=conductor:conductor /app/apps/api/dist /app/api/dist
COPY --from=api-builder --chown=conductor:conductor /app/packages/database/generated /app/packages/database/generated
COPY --from=api-builder --chown=conductor:conductor /app/packages/database/prisma /app/packages/database/prisma
COPY --from=api-builder --chown=conductor:conductor /app/packages/database/src/seeds /app/packages/database/src/seeds
COPY --from=api-builder --chown=conductor:conductor /app/packages/database/prisma.config.ts /app/packages/database/prisma.config.ts

# Copy Panel files (Next.js standalone build)
COPY --from=panel-builder --chown=conductor:conductor /app/apps/panel/.next/standalone /app/panel
COPY --from=panel-builder --chown=conductor:conductor /app/apps/panel/.next/static /app/panel/apps/panel/.next/static
COPY --from=panel-builder --chown=conductor:conductor /app/apps/panel/public /app/panel/apps/panel/public

# Copy Caddyfile
COPY --chown=conductor:conductor ./Caddyfile /etc/caddy/Caddyfile

# Copy supervisor configuration
COPY --chown=conductor:conductor ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy and prepare entrypoint script
COPY --chown=conductor:conductor ./docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create necessary directories with proper permissions
RUN mkdir -p /app/.cache/prisma /data /config && \
    chown -R conductor:conductor /app /data /config && \
    chmod -R 755 /app

# Set environment variables
ENV NODE_ENV=production
ENV PRISMA_ENGINES_CACHE_DIR=/app/.cache/prisma
ENV PORT=8080
ENV PANEL_PORT=3000
ENV API_PORT=4000

# Expose port (Railway will override with PORT env var)
EXPOSE 8080

# Run as conductor user
USER conductor

# Run entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]