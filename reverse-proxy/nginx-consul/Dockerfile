FROM nginx:stable

LABEL maintainer="Dario Rodriguez Gonzalez <dario.rodriguez-gonzalez@capgemini.com>"

EXPOSE 80 443

ENV CT_URL https://releases.hashicorp.com/consul-template/0.19.5/consul-template_0.19.5_linux_amd64.zip
RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y wget unzip runit && \
    wget --no-check-certificate $CT_URL && unzip consul-template_0.19.5_linux_amd64.zip -d /usr/local/bin && \
    mkdir -p /etc/service/nginx && mkdir -p /etc/service/consul-template
COPY ./nginx.service /etc/service/nginx/run
COPY ./consul-template.service /etc/service/consul-template/run
RUN chmod +x /etc/service/nginx/run && chmod +x /etc/service/consul-template/run && rm -v /etc/nginx/conf.d/*
COPY nginx.conf /etc/consul-templates/nginx.conf

CMD ["/usr/bin/runsvdir", "/etc/service/"]
