# 1. Build
FROM maven:3.5-jdk-8-alpine AS build
WORKDIR /app
COPY mtsj/. /app
RUN ls -l
RUN mvn install

# 2. Deploy Java war
FROM java:8
WORKDIR /app
COPY --from=build /app/server/target/mtsj-server-bootified.war /app/
ENTRYPOINT ["java","-jar","/app/mtsj-server-bootified.war"]
EXPOSE 8081