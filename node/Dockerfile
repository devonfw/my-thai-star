FROM node:lts AS builder

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY src/ ./src/
COPY templates/ ./templates/
COPY tsconfig*.json ./

RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
RUN yarn cache clean

EXPOSE 8081
CMD [ "npm","run", "start:prod" ]