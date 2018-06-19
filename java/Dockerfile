# 1. Build
FROM maven:3.5-jdk-8-alpine AS build
WORKDIR /app
COPY mtsj/. /app
RUN ls -l
RUN mvn install

# 2. Deploy Tomcat version
# FROM tomcat:latest
# WORKDIR /app
# COPY --from=build /app/server/target/mythaistar.war /usr/local/tomcat/webapps/
# EXPOSE 8080

# 3. Deploy jar
FROM java:8
WORKDIR /app
ADD /server/target/mtsj-server-bootified.war mtsj-server-bootified.war
ENTRYPOINT ["java","-jar","mtsj-server-bootified.war"]
EXPOSE 8080