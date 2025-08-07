# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Prune the monorepo to get only Panel dependencies
# ============================================================================
FROM oven/bun:1.2 AS pruner
WORKDIR /app

# Install turbo for monorepo pruning
COPY package.json ./
RUN bun add turbo --no-save --ignore-scripts

# Copy entire monorepo and prune to get only Panel deps
COPY . .
RUN bunx turbo prune @conductor/panel --docker

# ============================================================================
# Stage 2: Build the application
# ============================================================================
FROM oven/bun:1.2 AS builder
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Accept build arguments
ARG TURBO_TEAM

# Copy pruned package files and install dependencies
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source code and build configuration
COPY turbo.json ./turbo.json
COPY --from=pruner /app/out/full/ .

# Run codegen (Panda CSS) and build the application
RUN --mount=type=secret,id=turbo_token \
    cd apps/panel && bun run codegen && cd ../.. && \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo build --filter=@conductor/panel

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

# Copy Next.js standalone build
COPY --from=builder --chown=nonroot:nonroot /app/apps/panel/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/apps/panel/.next/static ./apps/panel/.next/static
COPY --from=builder --chown=nonroot:nonroot /app/apps/panel/public ./apps/panel/public

# Switch to non-root user
USER nonroot

# Expose port and set environment
EXPOSE 3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Start the Next.js server
CMD ["bun", "run", "apps/panel/server.js"]