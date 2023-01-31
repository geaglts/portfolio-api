FROM node:18-alpine AS base

RUN npm i -g pnpm

USER node

FROM base AS dependencies

WORKDIR /usr/src/app
COPY --chown=node:node package.json pnpm-lock.yaml  ./
RUN pnpm i

FROM base AS build

WORKDIR /usr/src/app
COPY --chown=node:node . .
COPY --chown=node:node --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

EXPOSE 3000
ENV NODE_ENV prod

WORKDIR /usr/src/app
COPY --chown=node:node .env ./.env
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]