FROM node:22-alpine AS pruner
WORKDIR /app

RUN npm i -g turbo

COPY . .

RUN turbo prune frontend --docker

FROM node:22-alpine AS installer
WORKDIR /app

COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=pruner /app/out/full .

RUN npx turbo run build --filter=frontend...

FROM nginx:1.31-alpine AS runner

COPY --from=pruner /app/out/full/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=installer /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80 
CMD [ "nginx", "-g", "daemon off;" ]