FROM node:lts AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy all files
COPY package.json ./
COPY yarn.lock ./
COPY src/ ./src/
COPY templates/ ./templates/
COPY tsconfig*.json ./

RUN npm install -g yarn
RUN yarn
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

EXPOSE 8081
CMD [ "npm","run", "start:prod" ]