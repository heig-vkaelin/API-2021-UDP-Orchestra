FROM node:16-alpine

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY src/ /home/node/app/

ENTRYPOINT [ "node", "app.js" ]