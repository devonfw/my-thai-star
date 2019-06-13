FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /var/www/
COPY docker-external-config.json /var/www/docker-external-config.json