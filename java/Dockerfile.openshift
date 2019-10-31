FROM adoptopenjdk/openjdk11:jre-11.0.4_11-alpine
WORKDIR /app
COPY mythaistar-bootified.war /app/
ENTRYPOINT ["java","-jar","/app/mythaistar-bootified.war"]
EXPOSE 8081