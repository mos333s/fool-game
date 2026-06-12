FROM node:22-alpine AS pruner
WORKDIR /app

RUN npm i -g turbo

COPY . .

RUN turbo prune backend --docker

FROM node:22-alpine as installer
WORKDIR /app

COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=pruner /app/out/full .

RUN npx turbo run build --filter=backend...

RUN npm prune --production

FROM node:22-alpine as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules

COPY --from=installer --chown=nestjs:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer --chown=nestjs:nodejs /app/apps/backend/package.json ./apps/backend/package.json

EXPOSE 3000
CMD ["node", "apps/backend/dist/src/main.js"]