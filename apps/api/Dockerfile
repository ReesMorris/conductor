# syntax=docker/dockerfile:1

# Stage 1: Prune the monorepo to get only API dependencies  
FROM oven/bun:1.2 AS pruner
WORKDIR /app

# Copy package.json to install turbo locally
COPY package.json ./
RUN bun add turbo --no-save --ignore-scripts

# Copy the rest of the monorepo
COPY . .
RUN bunx turbo prune @conductor/api --docker

# Stage 2: Build the application
FROM oven/bun:1.2 AS builder
WORKDIR /app

# Install OpenSSL for Prisma (combine update and install to reduce layers)
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Accept Turbo team as build arg (non-sensitive)
ARG TURBO_TEAM

# Copy pruned package files first for better caching
COPY --from=pruner /app/out/json/ .

# Install ALL dependencies for building
RUN bun install --frozen-lockfile --ignore-scripts

# Copy turbo.json before source for better cache invalidation
COPY turbo.json ./turbo.json

# Copy the pruned source code
COPY --from=pruner /app/out/full/ .

# Combine Prisma generation and build in one RUN to share secrets mount
RUN --mount=type=secret,id=turbo_token \
    TURBO_TOKEN=$(cat /run/secrets/turbo_token 2>/dev/null || echo "") \
    TURBO_TEAM=${TURBO_TEAM} \
    bun x turbo db:generate && \
    bun x turbo build --filter=@conductor/api

# Compile to standalone executable
RUN bun build ./apps/api/dist/index.js \
    --compile \
    --target=bun-linux-x64-baseline \
    --outfile=/app/api-standalone

# Stage 3: Production runtime - using distroless for minimal size
FROM gcr.io/distroless/base-debian12:nonroot
WORKDIR /app

# Copy the standalone executable with proper permissions
COPY --from=builder --chown=nonroot:nonroot /app/api-standalone /app/api

# Copy Prisma generated files (includes the query engine)
COPY --from=builder --chown=nonroot:nonroot /app/packages/database/generated /app/packages/database/generated

# Use non-root user (already set by :nonroot tag)
USER nonroot

EXPOSE 4000
ENV NODE_ENV=production

# Run the standalone executable
ENTRYPOINT ["/app/api"]