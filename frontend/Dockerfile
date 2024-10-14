FROM node:20-alpine AS dependencies

WORKDIR /app
COPY package*.json .
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:20-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["npm","start"]