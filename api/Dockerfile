# Global args, set before the first FROM, shared by all stages
ARG NODE_ENV="production"

################################################################################

FROM node:14-alpine
# Import our shared args
ARG NODE_ENV

# Cache node_modules for as long as possible
WORKDIR /app/
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile -P --aggregate-output
RUN pnpm build

ENV PORT=80
EXPOSE 5000

LABEL description="My PostGraphile-powered server"

# You might want to disable GRAPHILE_TURBO if you have issues
ENV GRAPHILE_TURBO=1
ENV NODE_ENV=$NODE_ENV
ENTRYPOINT pnpm start
