FROM node:12 as build
COPY lambda/ /web
RUN cd /web && npm install

FROM gcr.io/distroless/nodejs:12
COPY --from=build /web /web
EXPOSE 3001
WORKDIR /web
USER 1000
CMD ["server.js"]