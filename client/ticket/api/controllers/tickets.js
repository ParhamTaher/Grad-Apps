const mongoose = require('mongoose');

const Ticket = require('../models/ticket');

exports.get = (req, res, next) => {
	const id = req.params.ticketId;
	Ticket
		.findById(id) // Find data in DB that matches this criteria
		.then(result => { // Promise instead of callback (why? see https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks)
		  	result	? // Check if ticket exists
		  		res.status(200).json({
		  			ticket: result,
		  			request: {
		  				type: 'GET',
		  				description: 'Get all tickets',
		  				url: 'http://localhost:' + process.env.PORT + '/tickets'
		  			}
		  		}) :
		  		res.status(404).json({
		  			message: 'No valid entry found for provided ID'
		  		});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.get_all = (req, res, next) => {
	console.log(req.query);
	Ticket
		.find(req.query)
		.then(results => {
			const response = {
				count: results.length,
				tickets: results.map(result => {
					return {
						_id: result._id,
						faculty_id: result.faculty_id,
						applicant_id: result.applicant_id,
						status: result.status,
						status_history: result.status_history,
						ticket_type: result.ticket_type,
						request: {
							type: 'GET',
							url: 'http://localhost:' + process.env.PORT + '/tickets/' + result._id
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

exports.create = (req, res, next) => {
	const ticket = new Ticket({
		_id: new mongoose.Types.ObjectId(), //Mongoose function that generates a unique ID
		faculty_id: req.body.faculty_id,
		applicant_id: req.body.applicant_id,
		status: req.body.status,
		status_history: req.body.status_history,
		creation_date: req.body.date,
		ticket_type: req.body.ticket_type
	});
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
						status_history: result.status_history,
						ticket_type: result.ticket_type,
						request: {
							type: 'GET',
							url: 'http://localhost:' + process.env.PORT + '/tickets/' + result._id
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

exports.create_batch = (req, res, next) => {
	const num_tickets = req.params.num_tickets;
	const ticket_batch = [];
	for (i = 0; i < num_tickets; i++) {
		var ticket = new Ticket({
			_id: new mongoose.Types.ObjectId(),
			faculty_id: req.body.faculty_id,
			applicant_id: req.body.applicant_id,
			status: req.body.status,
			status_history: req.body.status_history,
			creation_date: req.body.date,
			ticket_type: req.body.ticket_type
		});
		ticket_batch.push(ticket);
	}
	Ticket
		.insertMany(ticket_batch)
		.then(results => {	
			const response = { // Format the response
				count: results.length,
				tickets: results.map(result => {
					return {
						_id: result._id,
						faculty_id: result.faculty_id,
						applicant_id: result.applicant_id,
						status: result.status,
						status_history: req.body.status_history,
						ticket_type: result.ticket_type,
						request: {
							type: 'GET',
							url: 'http://localhost:' + process.env.PORT + '/tickets/'
						}
					}
				})
			};
		    res.status(201).json(response);
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
	var status_log = {};
	for (const field of req.body) {
		if (field.fieldName != 'status_history')
			update_fields[field.fieldName] = field.value;
		if (field.fieldName == 'status')
			status_log = { status: field.value, update_date: new Date() };
	}
	if (status_log.length != '') {
		console.log('STATUS LOG HERERREEE', status_log);
		Ticket
			.update({_id: id}, 
				{ 
						$set: update_fields, 
						$push: {status_history: status_log}
				},
				{ upsert: true, runValidators: true }) // Update data in DB
			.then(result => {
				res.status(200).json({
					message: 'Ticket updated',
					request: {
						type: 'GET',
						url: 'http://localhost:' + process.env.PORT + '/tickets/' + id
					}
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	} else {
		Ticket
			.update({_id: id}, { $set: update_fields },
				{ upsert: true, runValidators: true }) // Update data in DB
			.then(result => {
				res.status(200).json({
					message: 'Ticket updated',
					request: {
						type: 'GET',
						url: 'http://localhost:' + process.env.PORT + '/tickets/' + id
					}
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	}
};

exports.update_by_faculty = (req, res, next) => {
	const id = req.params.facultyId;
	const update_fields = {};	// Make update iterable so can update none, some, or all fields
	var status_log = {};
	for (const field of req.body) {
		if (field.fieldName != 'status_history')
			update_fields[field.fieldName] = field.value;
		if (field.fieldName == 'status')
			status_log = { status: field.value, update_date: new Date() };
	}
	if (status_log.length != '') {
		Ticket
			.update({faculty_id: id}, 				
				{ 
						$set: update_fields, 
						$push: {status_history: status_log}
				}, 
				{ multi: true, upsert: true, runValidators: true })
			.then(results => {
				res.status(200).json({
					message: results.n + ' Ticket(s) updated',
					request: {
						type: 'GET',
						url: 'http://localhost:' + process.env.PORT + '/tickets/faculty/' + id
					}
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});

	} else {
		Ticket
			.update({faculty_id: id}, {$set: update_fields}, 
				{ multi: true, upsert: true, runValidators: true })
			.then(results => {
				res.status(200).json({
					message: results.n + ' Ticket(s) updated',
					request: {
						type: 'GET',
						url: 'http://localhost:' + process.env.PORT + '/tickets/faculty/' + id
					}
				});
			})
			.catch(err => {
				res.status(500).json({
					error: err
				});
			});
	}
};

exports.update_status = (req, res, next) => {
	const id = req.params.ticketId;
	var status_log = { status: req.body.status, update_date: new Date() };
	Ticket
		.update({_id: id}, 
			{
				$set: {status: req.body.status}, 
				$push: {status_history: status_log}
			}, 
			{ upsert: true, runValidators: true }
		)
		.then(result => {
			res.status(200).json({
				message: 'Ticket status updated',
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
					url: 'http://localhost:' + process.env.PORT + '/tickets',
					body: { faculty_id: 'String', ticket_type: "{ type: String, enum: ['D', 'I'] }" }
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.delete_all = (req, res, next) => {
	Ticket
		.remove(req.query)
		.then(result => { 
			res.status(200).json({
				message: result.n + ' Ticket(s) Deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:' + process.env.PORT + '/tickets',
					body: { faculty_id: 'String', ticket_type: "{ type: String, enum: ['D', 'I'] }" }
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

