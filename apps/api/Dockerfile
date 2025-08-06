# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Prune the monorepo to get only API dependencies
# ============================================================================
FROM oven/bun:1.2 AS pruner
WORKDIR /app

# Install turbo for monorepo pruning
COPY package.json ./
RUN bun add turbo --no-save --ignore-scripts

# Copy entire monorepo and prune to get only API deps
COPY . .
RUN bunx turbo prune @conductor/api --docker

# ============================================================================
# Stage 2: Build the application
# ============================================================================
FROM oven/bun:1.2 AS builder
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Accept build arguments
ARG TURBO_TEAM

# Copy pruned package files and install dependencies
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code and build configuration
COPY turbo.json ./turbo.json
COPY --from=pruner /app/out/full/ .

# Generate Prisma client and build the application
RUN --mount=type=secret,id=turbo_token \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo db:generate && \
    bun x turbo build --filter=@conductor/api

# ============================================================================
# Stage 3: Production runtime
# ============================================================================
FROM oven/bun:1.2-alpine
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    libc6-compat \
    libstdc++ \
    libgcc \
    ca-certificates

# Create non-root user
RUN addgroup -g 1001 -S nonroot && \
    adduser -S nonroot -u 1001

# Install Prisma CLI for migrations
RUN bun add prisma@^6.13.0 --no-save --ignore-scripts

# Copy application files
COPY --from=builder --chown=nonroot:nonroot /app/apps/api/dist /app/dist
COPY --from=builder --chown=nonroot:nonroot /app/packages/database/generated /app/packages/database/generated
COPY --from=builder --chown=nonroot:nonroot /app/packages/database/prisma /app/packages/database/prisma

# Copy and prepare entrypoint script
COPY ./apps/api/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create writable directory for Prisma engines and set permissions
RUN mkdir -p /app/.cache/prisma && \
    chown -R nonroot:nonroot /app && \
    chmod -R 755 /app

# Switch to non-root user
USER nonroot

# Expose port and set environment
EXPOSE 4000
ENV NODE_ENV=production
ENV PRISMA_ENGINES_CACHE_DIR=/app/.cache/prisma

# Run migrations and start the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]