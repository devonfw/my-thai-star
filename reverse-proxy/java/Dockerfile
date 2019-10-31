FROM adoptopenjdk/openjdk11:jre-11.0.4_11-alpine
WORKDIR /app
COPY ./mythaistar.war /app/
HEALTHCHECK --interval=60s --timeout=30s --retries=3 CMD curl --fail http://localhost:8081/mythaistar/services/rest/dishmanagement/v1/category/0/ || exit 1 
ENTRYPOINT ["java","-jar","/app/mythaistar.war"]
EXPOSE 8081