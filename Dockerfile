FROM node:20-slim AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM node:20-slim

WORKDIR /app/server

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY ./server/package.json ./server/package-lock.json* ./
RUN npm install --omit=dev

COPY ./server .

COPY --from=build /app/build ./build

EXPOSE 4000

CMD ["npm", "start"]