# 1. Build
FROM node:lts AS build
WORKDIR /app
COPY . /app
RUN npm i -g yarn
RUN yarn
RUN yarn build --configuration=docker

# 2. Deploy
FROM nginx:latest
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  apache2-utils \
  && rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/. /usr/share/nginx/html
COPY external-config/* /usr/share/nginx/html/configs/*
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
