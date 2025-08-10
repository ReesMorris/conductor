# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Prune the monorepo to get only proxy dependencies
# ============================================================================
FROM oven/bun:1.2 AS pruner
WORKDIR /app

# Install turbo for monorepo pruning
COPY package.json ./
RUN bun add turbo --no-save --ignore-scripts

# Copy entire monorepo and prune to get only proxy deps
COPY . .
RUN bunx turbo prune @conductor/proxy --docker

# ============================================================================
# Stage 2: Build the application
# ============================================================================
FROM oven/bun:1.2 AS builder
WORKDIR /app

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
    bun x turbo build --filter=@conductor/proxy

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
    ca-certificates \
    dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nonroot && \
    adduser -S nonroot -u 1001

# Copy application files
COPY --from=builder --chown=nonroot:nonroot /app/apps/proxy/dist /app/dist
COPY --from=builder --chown=nonroot:nonroot /app/packages/database/generated /app/packages/database/generated

# Set permissions
RUN chown -R nonroot:nonroot /app && \
    chmod -R 755 /app

# Switch to non-root user
USER nonroot

# Expose port (Railway will dynamically assign PORT)
# Document the ports the proxy will listen on for game connections
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the proxy service
CMD ["bun", "run", "/app/dist/index.js"]