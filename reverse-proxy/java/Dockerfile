FROM java:8
WORKDIR /app
COPY ./mtsj-server-bootified.war /app/
ENTRYPOINT ["java","-jar","/app/mtsj-server-bootified.war"]
EXPOSE 8081