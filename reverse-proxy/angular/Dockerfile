FROM nginx:alpine-perl

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /var/www/
COPY external-config/* /usr/share/nginx/html/configs/