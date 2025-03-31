FROM node:22-alpine3.21 AS build

WORKDIR /usr/src/api

COPY . .

RUN npm install
RUN npm run build

FROM node:22-alpine3.21

WORKDIR /usr/src/api

COPY --from=build /usr/src/api/ ./
COPY entrypoint.sh /usr/src/api/entrypoint.sh
RUN chmod +x /usr/src/api/entrypoint.sh

USER node
EXPOSE 3000

ENTRYPOINT ["/usr/src/api/entrypoint.sh"]
