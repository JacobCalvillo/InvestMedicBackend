# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.18.3

FROM node:20-alpine3.20 AS base

# Set working directory for all build stages.
WORKDIR /usr/app

# Copy the .env file to the container
COPY .env .env

FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps AS build

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy tsconfig.json
COPY tsconfig.json ./

# Copy the source files into the correct directory
COPY src/ ./src/

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS final

# Use production node environment by default.
ENV NODE_ENV=production

# Copy the production dependencies from the deps stage
COPY --from=deps /usr/app/node_modules ./node_modules

# Copy the built application from the build stage
COPY --from=build /usr/app/build ./build

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application (usando server.js como punto de entrada)
CMD ["node", "build/server.js"]