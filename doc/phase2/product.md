# Technical Product Report

## Progress
Created three Restful API’s for GAPF forms, tickets, and users using the following frameworks: 
 - Express was used to organize an MVC architecture (minus the ‘View’) on the server side
 - MongoDB was used as the database and Mongoose as the ORM tool
The services offer endpoints that enable creating, reading, updating, or deleting items.
See the corresponding documents for more details:
 - Ticket [README.md](https://github.com/csc302-winter-2018/proj-TEAM13/blob/backend/server/ticket/README.md)
 - Users [README.md](https://github.com/csc302-winter-2018/proj-TEAM13/blob/backend/server/users/README.md)

Created a solid front-end platform to build on with the required dependencies. Login, SignUp, and all the Dashboards created for the different user roles. Redux setup and Redux Store configured with appropriate reducers and actions. Merged the front and back end and configured app for deployment.

## Changes

There was not much deviation from the overall architecture, on the backend side all three web services (gapf, ticket, and users) were setup but it quickly became evident that more work had to be done. The initially proposed API endpoints in the project.yml file were not sufficiently detailed enough to handle all services (ie. creating multiple tickets)  so more endpoints had to be added. On the frontend side, the initially proposed two web apps were merged into a single web app. The reason for this change is that it was possible and in fact easier to display any relevant page conditional on the authenticated user.

## High-level Design

At a high-level, our software is split up into three main dashboards: Budget Director, Associate Chair/Admin, and Faculty. Depending on which type of user signs into the system, the relevant page will be displayed to them. The core function of the software is to manage the production, distribution, and editing of tickets, and we make sure that all tickets are consistent on all dashboards and only certain users can do certain actions on the tickets. 
For GAPF, faculty can add their budget documents, those documents can be viewed by the Budget director and used to create the tickets.

## Technical Highlights

 - There was significant overhead time spent on learning about microservices, in particular about how to separate functionality into different servers without having them be explicitly dependent on each other as well as figuring out how to get them to work together.
 - Learning React/Redux in a relatively short period of time, especially for group members who were not prominent web developers. 
 - The biggest challenge for the front-end was making sure everyone understood the Redux workflow and that we made React components which were reusable by all the front-end developers.
 - A bug which was encountered on the front-end was when passing a function to child components as a prop. The function would be invoked immediately, rather than waiting for an event handler. After reading more React documentation, we found the correct syntax to pass a function down as a reference. We are still having some issues with this and also binding, but are working it out.
 - An interesting lesson learned was how to test endpoints. There were a lot of good online resources about Mocha and Chai that helped in implementing the tests for users service. 
 - Defects for the gapf upload module was in the get and delete requests. For get, files were not being found although parameters being passed were correct. For delete, responses were being sent stating the deletion was successful yet, the file and chunks were still in the database. Further investigation lead to finding the api was looking into the wrong root collection. Making it point to the right root collection, fixed the issues. 


## Teamwork and Process Reflection

 - We had a lot of meetings to discuss what was left to be done, which was good, but some of them felt as if not enough progress was made. Meetings were held every Monday 5-6pm and sometimes Wednesdays to clarify anything needed. Front-end and back-end groups met together outside of assigned meeting times as was required. 
 - What worked well was that everyone was open to suggestions and we came to agreements quite easily.
 - There were small disjoints in communication between the front-end and back-end, hopefully this will be avoided going forward when we start merging both ends of the project.

## Artifacts

 - We implemented a Kanban board using [Trello](https://trello.com/b/dLiyb39P/team-13) as a means to approximate progress. Each member created tasks as they saw fit and updated the board accordingly. 
 - The database schema used for the project can be found [here](https://docs.google.com/spreadsheets/d/1_8FHCAz6SHX4NRkIlimFl9r8Mka5_OoZFanmNg8Y5aE/edit#gid=0). (diagram will be provided for phase 3).

## Triage

The following are some TODOs to be implemented for phase 3
 - Dockerize each web service (starting with the tickets service)
 - Ticket Service:
      - Add pagination to limit the amount of results returned by a request so it does not blow up when too many tickets are queried
      - Add notes endpoint (time permitting)
 - Users Service:
      - Add authentication and session management, and associated tests.
      - Improve password save format (currently saving text, should be encrypted).
 - Gapf Service:
      - Update documents, delete multiple documents
      - Format the binary data to the front end
      - Write test scripts
      - Connect to the front end
 - Front-End:
     - Connect all the front-end actions to the relevant api endpoints
     - Get proper user authentication working
     - Front-end testing
     - Implement handling of tickets based on respective users

The goal for the final demo to be able to handle different use cases in the web app and to be able to explicitly show a workflow of a grad application process from start to finish by tracing the exchange of data from front-end to back-end and vice versa.

