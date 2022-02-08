FROM node:14-alpine

ARG NODE_ENV="production"

# Cache node_modules for as long as possible
WORKDIR /app/
COPY . .
RUN apk add --no-cache curl
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile -P --aggregate-output
RUN pnpm build

ARG PORT=80
ENV PORT=$PORT
EXPOSE $PORT

HEALTHCHECK CMD ./healthcheck.sh

LABEL description="My PostGraphile-powered server"

# You might want to disable GRAPHILE_TURBO if you have issues
ENV GRAPHILE_TURBO=1
ENV NODE_ENV=$NODE_ENV
ENTRYPOINT node dist/server.js
