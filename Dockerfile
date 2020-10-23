FROM node:alpine as build
WORKDIR /app
COPY . /app

RUN yarn --ignore-optional --network-timeout=30000

EXPOSE 3333

CMD [ "yarn", "dev:server" ]
