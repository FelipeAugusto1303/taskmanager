FROM node:16

# Create app directory
RUN mkdir -p /backend
WORKDIR /backend

# Copy app source code
COPY . /backend

# Install dependencies
RUN npm i -g @nestjs/cli
RUN npm install
RUN chown -R node:node /backend/node_modules

# FROM node:14.15.4-alpine3.12

# RUN apk add --no-cache bash

# RUN npm install -g @nestjs/cli

# USER node

# WORKDIR /home/node/app


