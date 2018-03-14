const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ticket = require('../models/ticket');

// Get all tickets
router.get('/', (req, res, next) => {
	Ticket
		.find()  // Find data in the DB
		.then(result => {  // Promise instead of callback (why? see https://stackoverflow.com/questions/22539815/arent-promises-just-callbacks)
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {  // Catch any errors that may occur before this point
			console.log(err)
			res.status(500).json({
				error: err
			});
		});
});

// Create a ticket
router.post('/', (req, res, next) => {
	const ticket = new Ticket({
		_id: new mongoose.Types.ObjectId(), //Mongoose function that generates a unique ID
		faculty_id: req.body.faculty_id,
		applicant_id: req.body.applicant_id,
		status: req.body.status,
		date: req.body.date,
		d_or_i: req.body.d_or_i
	});
	ticket
		.save() // Store data into the DB
		.then(result => {	
		      	console.log(result);
		      	res.status(201).json({
					message: 'Ticket created successfully',
					createdTicket: result
				});
		      })
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			});
		});
});

// Get a ticket by ID
router.get('/:ticketId', (req, res, next) => {
	const id = req.params.ticketId;
	Ticket
		.findById(id)
		.then(result => {
			console.log("Returned from DB:", result);
		  	if (result) {	// Check if ticket exists
		  		res.status(200).json(result);
		  	} else {
		  		res.status(404).json({
		  			message: 'No valid entry found for provided ID'
		  		});
		  	}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			});
		});
});

// Delete a ticket by ID
router.delete('/:ticketId', (req, res, next) => {
	const id = req.params.ticketId;
	Ticket
		.remove({_id: id}) // Remove any object that fulfills this criteria
		.then(result => { 
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;