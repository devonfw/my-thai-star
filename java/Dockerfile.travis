# Only used for TravisCI purposes

FROM maven:3.5-jdk-8-alpine AS build
WORKDIR /app
COPY mtsj/. /app
RUN mvn test
RUN mvn install
RUN ls -l server/target
