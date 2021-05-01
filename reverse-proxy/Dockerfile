FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY /etc/nginx/fullchain.pem /etc/letsencrypt/live/demo.bitshift-team.de/fullchain.pem
COPY /etc/nginx/privkey.pem /etc/letsencrypt/live/demo.bitshift-team.de/privkey.pem