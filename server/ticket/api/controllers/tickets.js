const mongoose = require('mongoose');

const Ticket = require('../models/ticket');

exports.get_all = (req, res, next) => {
	Ticket
		.find()  // Find data in the DB
		.then(results => {  // Promise instead of callback (why? see https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks)
			const response = { // Format the response
				count: results.length,
				tickets: results.map(result => {
					return {
						_id: result._id,
						faculty_id: result.faculty_id,
						applicant_id: result.applicant_id,
						status: result.status,
						domestic: result.domestic,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/tickets/' + result._id
						}
					}
				})
			};
			results ? // Check if tickets exist
				res.status(200).json(response) : 
				res.status(404).json({
					message: 'No entries found'
				});
		})
		.catch(err => {  // Catch any errors that may occur before this point
			res.status(500).json({
				error: err
			});
		});
};

exports.get_one = (req, res, next) => {
	const id = req.params.ticketId;
	Ticket
		.findById(id)
		.then(result => {
		  	result	? // Check if ticket exists
		  		res.status(200).json({
		  			ticket: result,
		  			request: {
		  				type: 'GET',
		  				description: 'Get all tickets',
		  				url: 'http://localhost:3000/tickets'
		  			}
		  		}) :
		  		res.status(404).json({
		  			message: 'No valid entry found for provided ID'
		  		});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			});
		});
};

exports.create = (req, res, next) => {
	const ticket = new Ticket({
		_id: new mongoose.Types.ObjectId(), //Mongoose function that generates a unique ID
		faculty_id: req.body.faculty_id,
		applicant_id: req.body.applicant_id,
		status: req.body.status,
		creation_date: req.body.date,
		domestic: req.body.domestic
	});
	console.log("REQ BODY ", req.body);
	ticket
		.save() // Store data into the DB
		.then(result => {	
		      	res.status(201).json({
					message: 'Ticket created successfully',
					createdTicket: {
						_id: result._id,
						faculty_id: result.faculty_id,
						applicant_id: result.applicant_id,
						status: result.status,
						domestic: result.domestic,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/tickets/' + result._id
						}
					}
				});
		      })
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.update = (req, res, next) => {
	const id = req.params.ticketId;
	const update_fields = {};	// Make update iterable so can update none, some, or all fields
	for (const field of req.body) {
		update_fields[field.fieldName] = field.value;
	}
	Ticket
	.update({_id: id}, {$set: update_fields}) // Update data in DB
	.then(result => {
		res.status(200).json({
			message: 'Ticket updated',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/tickets/' + id
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
};

exports.delete = (req, res, next) => {
	const id = req.params.ticketId;
	Ticket
		.remove({_id: id}) // Remove any object that fulfills this criteria
		.then(result => { 
			res.status(200).json({
				message: 'Ticket Deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/tickets',
					body: { faculty_id: 'String', domestic: 'Boolean' }
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

