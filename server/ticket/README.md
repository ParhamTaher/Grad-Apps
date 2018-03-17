# Ticket Server

A simple RESTful API for querying tickets.

Tools used:

- Express
- Mongoose + MongoDB
- Docker

Key features:

- Create, Read, Update, Delete (CRUD) tickets
- CRUD tickets in batches
- Query tickets with specific filters

## Quickstart

Clone this repo, then run the commands below from the root directory

```shell
npm install
npm start
```

The API will be running on localhost:3000

## API endpoints

- `/tickets`: main entrypoint for tickets
- `/tickets/:ticketId`: query a ticket by its unique `ticketId`

### Examples

### `GET`

- `/tickets`: queries all the tickets

### `POST`

- `/tickets`: create a new ticket

Request.Body:
```json
{
    "faculty_id": "mzaleski",
    "domestic": "true"
}
```

### `PATCH`

- `/tickets/:ticketId`: updates the specified ticket

Updates can be made modularly on a ticket by listing out any desired changes on specified fields in an array format.

Request.Body:
```json
[
	{"fieldName": "faculty_id", "value": "pbacals"},
	{"fieldName": "applicant_id", "value": "1000369610"},
	{"fieldName": "status", "value": "offer-request"},
	...
]
```

### `DELETE`

- `/tickets/:ticketId`: deletes the specified ticket

## Ticket Schema

```js
{
	faculty_id: { 
		type: String, 
		required: true 
	},
	applicant_id: Number,
	status: { 
		type: String,
		enum: ['initial', 'granted', 'offer-request', 'offer-pending', 'accepted', 'refused'],
		default: 'initial'
	},
	creation_date: { 
		type: Date, 
		default: Date.now
	},
	domestic: { 
		type: Boolean, 
		required: true 
	}
}
```





