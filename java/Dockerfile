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
COPY --from=build /app/server/target/mtsj-server-bootified.war /app/
# ADD /app/server/target/mtsj-server-bootified.war mtsj-server.war
# ADD /root/.m2/repository/io/oasp/application/mtsj-server/0.1-SNAPSHOT/mtsj-server-0.1-SNAPSHOT-bootified.war mtsj-server.war
ENTRYPOINT ["java","-jar","/app/mtsj-server-bootified.war"]
# EXPOSE 8080
EXPOSE 8081