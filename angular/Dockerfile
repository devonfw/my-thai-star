# 1. Build
FROM teracy/angular-cli AS build
WORKDIR /app
COPY . /app
RUN npm i
RUN ng build --prod --build-optimizer

# 2. Deploy
FROM nginx:latest
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      apache2-utils \
 && rm -rf /var/lib/apt/lists/*
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/. /usr/share/nginx/html
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]