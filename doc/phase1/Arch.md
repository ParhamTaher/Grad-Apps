# Architecture

We are splitting the system into 2 webapps and 3 services, a ticket system and GAPF system each with their respective micro service and an additional service for users that handles applicants, faculty and user roles & responsibilities. Both systems will have a React client and we will be using nodejs for the microservices to serve the endpoints. The endpoints will serve JSON and the data will be hosted in a mongodb database.

## Microservices:
* GAPF service: serves GAPF forms and attached documents.
* Ticket service: serves tickets and related notes.
* Users service: serve applicants, faculty, and users.

## Use Cases:

* #### Use cases for each webapp:
    * GAPF webapp: 2-4, 12-14, 33.
    * Ticket webapp: 1, 5-6, 10-11, 15-17, 20-22, 30-32.

* #### Use cases for each service:
    * GAPF service: 2-4, 12-14, 33.
    * Ticket service: 1, 5-6, 10-11, 15-17, 20-22, 30-32.
    * Users service: 2, 3, 4, 6, 12, 16, 17, 22, 33

  **Note: Due to the large size of the system the use cases (#1,10,20,30) for ticket notes (adding, editing, deleting, and resolving) will not be prioritized (work on these use cases will be done if time is available towards the end of the project).**
  
