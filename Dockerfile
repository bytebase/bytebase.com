FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

# Define arguments
ARG SITE_URL

ARG ALGOLIA_WEBHOOK_SECRET
ARG ALGOLIA_ADMIN_API_KEY
ARG ALGOLIA_INDEX_NAME
ARG ALGOLIA_SEARCH_KEY
ARG ALGOLIA_APP_ID

ARG MAILCHIMP_API_KEY
ARG MAILCHIMP_AUDIENCE_ID
ARG MAILCHIMP_API_SERVER

ENV NEXT_PUBLIC_DEFAULT_SITE_URL=${SITE_URL}

ENV NEXT_PUBLIC_ALGOLIA_WEBHOOK_SECRET=${ALGOLIA_WEBHOOK_SECRET}
ENV NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY=${ALGOLIA_ADMIN_API_KEY}
ENV NEXT_PUBLIC_ALGOLIA_INDEX_NAME=${ALGOLIA_INDEX_NAME}
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=${ALGOLIA_SEARCH_KEY}
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=${ALGOLIA_APP_ID}

ENV MAILCHIMP_API_KEY=${MAILCHIMP_API_KEY}
ENV MAILCHIMP_AUDIENCE_ID=${MAILCHIMP_AUDIENCE_ID}
ENV MAILCHIMP_API_SERVER=${MAILCHIMP_API_SERVER}

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]