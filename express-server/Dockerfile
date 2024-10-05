# Stage-1
FROM node:18-alpine as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY src/ src/
COPY tsconfig.json tsconfig.json

RUN npm run build

# Stage-2
FROM node:18-alpine as runner

ARG MONGODB_URI
ARG HANKO_API_URI 
ARG JWT_SECRET
ARG FRONTEND_URL

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules/
COPY --from=builder build/dist dist/


EXPOSE 8080

ENTRYPOINT ["npm", "start"]