FROM java:8
WORKDIR /app
COPY ./mythaistar.war /app/
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=3 CMD curl --fail http://localhost:8081/mythaistar/services/rest/dishmanagement/v1/category/0/ || exit 1 
ENTRYPOINT ["java","-jar","/app/mythaistar.war"]
EXPOSE 8081