FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production

# Build the application
FROM base AS builder
COPY package.json tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
RUN yarn build

# Production image
FROM base AS runner
ENV NODE_ENV=production

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Run as non-root user
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]