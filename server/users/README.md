# Users Server

A simple RESTful API for querying users.

Tools used:

- Express
- Mongoose + MongoDB
- Mocha + Chai & chai-http

Key features:

- Sign Up and Log In users.
- Access and update Faculty users.
- Access Applicants with the possibility to update their status.

## Quickstart

Clone this repo, then run the commands below from the root directory

```shell
npm install
```
Run dev:
```shell
npm start
```
Run tests:
```shell
npm test
```

The API will be running on localhost:3002

## API endpoints

- `/users/signup`: enroll new users, requires unique email.
- `/users/login`: log in as given user, requires email and password of enrolled user.
- `/faculty/`: retrive all users that are faculty.
- `/faculty/:facultyId`: retrive or update faculty user by its unique `facultyId`
- `/applicants/`: retrive all applicants.
- `/applicants/:applicantId`: retrive applicant or update applicant status by its unique `applicantId`, 

### Examples

### `GET`

- `/faculty`: retrive all users that have the role `Faculty`.
- `/faculty?facultyId=5ab4c6551781a15a082d8ce5`: retrive user that have the id `5ab4c6551781a15a082d8ce5` iff it's role is `Faculty`.
- `/applicants`: retrive all applicants.
- `/applicants/applicantId=5ab31c8e0a1abb207cb19350`: retrive applicant that have the id `5ab31c8e0a1abb207cb19350`.

### `POST`

- `/users/signup`: create a new user.
- `/users/login`: log in user. (authentication to be added)

Request.Body for users/signup:
```json
{
	"fname": "fname",
	"lname": "lname",
	"email": "email",
	"password": "password"
}
```

Request.Body for users/login:
```json
{
	"email": "email",
	"password": "password"
}
```

### `PUT`

- `/faculty?facultyId=5ab4c6551781a15a082d8ce5`: update user that have the id `5ab4c6551781a15a082d8ce5` iff it's role is `Faculty`.
- `/applicants?applicantId=5ab31c8e0a1abb207cb19350`: update the status of the applicant that have the id `5ab31c8e0a1abb207cb19350`, options for status: `available, accepted, refused`.

Request.Body for faculty:
```json
{
	"fname": "newfname",
	"lname": "newlname",
	"email": "newemail",
	"password": "newpassword"
}
```

Request.Body for applicant:
```json
{
	"status": "newstatus"
}
```

Updates can be made modularly on a faculty by listing out any desired changes on specified fields in an array format. Faculty role can not be change in this way.

## Users Schema

```js
{
	_id: mongoose.Schema.Types.ObjectId,
	role: { 
        type: String,
        enum: ['Faculty', 'FSS', 'Budget Director', 'Associate Chair graduate', 'Grad office staff'],
        required: true
    },
    fname: { type: String, required: true, validate: lengthValidator },
    lname: { type: String, required: true, validate: lengthValidator },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: emailValidator
    },
    password: { type: String, required: true },
	creation_date: { 
		type: Date, 
		default: Date.now
	}
}
```
## Applicants Schema

```js
{
	_id: mongoose.Schema.Types.ObjectId,
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
	status: { 
		type: String,
		enum: ['available', 'accepted', 'refused'],
		default: 'available'
	},
	creation_date: { 
		type: Date, 
		default: Date.now
	}
}
```






