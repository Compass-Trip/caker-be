# Multi-stage build for optimized production image
# Multi-stage build: 빌드용과 실행용 이미지 분리
FROM node:20-alpine AS base

# Install dumb-init for proper signal handling
# dumb-init으로 올바른 처리 & Graceful shutdown 지원
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY . .
RUN yarn build

# Production dependencies stage
FROM base AS production-deps
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production && yarn cache clean


# Production stage
FROM node:20-alpine AS production

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set working directory
WORKDIR /usr/src/app

# Copy production dependencies
COPY --from=production-deps --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=development --chown=nestjs:nodejs /usr/src/app/dist ./dist

# Copy package.json for runtime
COPY --chown=nestjs:nodejs package.json ./

# Switch to non-root user
USER nestjs

# Expose port (NestJS default: 3000)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/main.js"]