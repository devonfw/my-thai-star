FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY /etc/letsencrypt/live/demo.bitshift-team.de/fullchain.pem /etc/nginx/fullchain.pem
COPY /etc/letsencrypt/live/demo.bitshift-team.de/privkey.pem /etc/nginx/privkey.pem