# 1. Build
FROM maven:3.5-jdk-8-alpine AS build
WORKDIR /app
COPY mtsj/ /app
RUN mvn clean install

# 2. Deploy Java war
FROM java:8
WORKDIR /app
COPY --from=build /app/server/target/mythaistar-bootified.war /app/
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 CMD curl --fail http://localhost:8081/mythaistar/services/rest/dishmanagement/v1/category/0/ || exit 1 
ENTRYPOINT ["java","-jar","/app/mythaistar-bootified.war"]
EXPOSE 8081