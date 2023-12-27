FROM node:16

RUN mkdir -p /backend
WORKDIR /backend

COPY . /backend

RUN npm i -g @nestjs/cli
RUN npm install
RUN chown -R node:node /backend/node_modules




