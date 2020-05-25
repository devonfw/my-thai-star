# Passbook Microservice

This microservice is written in Camel / Spring Boot, with rest DSL. 
It receives an API call from the angular clients table booking service, creates a pass using the passslot web API,
and sends the original request to the java MTS backend for further processing.

the passslot API requires a registered account (free). The account specific key and template number can be configured in the application properties,
just as the URI to the java backend (to reroute the original angular request to).
