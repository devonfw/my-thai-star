# 1. Build
FROM maven:3.6-jdk-11 AS build
WORKDIR /app
COPY mtsj/ /app
RUN mvn clean install

# 2. Deploy Java war
FROM adoptopenjdk/openjdk11:jre-11.0.4_11-alpine
WORKDIR /app
COPY --from=build /app/server/target/mythaistar-bootified.war /app/
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 CMD wget http://localhost:8081/mythaistar/services/rest/dishmanagement/v1/category/0/ --quiet --output-document - >/dev/null 2>&1
ENTRYPOINT ["java","-jar","/app/mythaistar-bootified.war"]
EXPOSE 8081
