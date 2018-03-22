# Technical Product Report

## Progress

Created a Restful API for the ticketing system using the following frameworks: 
Express was used to organize an MVC architecture (minus the ‘View’) on the server side
MongoDB was used as the database and Mongoose as the ORM tool
The ticket service offers endpoints that enables creating, reading, updating, or deleting tickets individually or in batches. See the ticket [README.md](https://github.com/csc302-winter-2018/proj-TEAM13/blob/master/client/ticket/README.md) for more details

## Changes

There was not much deviation from the overall architecture, on the backend side all three web services (gapf, ticket, and users) were setup but it quickly became evident that more work had to be done. The initially proposed API endpoints in the project.yml file were not sufficiently detailed enough to handle all services (ie. creating multiple tickets)  so more endpoints had to be added. On the frontend side, the initially proposed two web apps were merged into a single web app. The reason for this change is that it was possible and in fact easier to display any relevant page conditional on the authenticated user.

## High-level Design



## Technical Highlights

Challenges:

There was significant overhead time spent on learning about microservices, in particular about how to separate functionality into different servers without having them be explicitly dependent on each other as well as figuring out how to get them to work together.

## Teamwork and Process Reflection



## Artifacts

Kanban board using [Trello](https://trello.com/b/dLiyb39P/team-13)

## Triage

- Dockerize webservices and webapp
- Ticket service:
	- Add notes that can be edited/reviewed
	- Add pagination to limit the amount of results returned by a request 
