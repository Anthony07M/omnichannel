FROM node:22-alpine3.21 AS build

WORKDIR /usr/src/api

COPY . .

RUN npm install
RUN npm run build

FROM node:22-alpine3.21

WORKDIR /usr/src/api

COPY --from=build /usr/src/api/ ./

USER node
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
