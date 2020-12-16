# 1. Build
FROM node:lts AS build
WORKDIR /app

COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN yarn build --configuration=docker

# 2. Deploy
FROM nginx:latest
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  apache2-utils curl \
  && rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/. /usr/share/nginx/html
COPY docker-external-config.json /usr/share/nginx/html/docker-external-config.json
EXPOSE 80 443

HEALTHCHECK --interval=60s --timeout=30s --start-period=1s --retries=3 CMD curl --fail http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
