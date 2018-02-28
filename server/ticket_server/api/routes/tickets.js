const express = require('express');
const router = express.Router();

// Get all tickets
router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Tickets were fetched'
	});
});

// Create a ticket
router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'Ticket was created',
	});
});

// Get a ticket by ID
router.get('/:ticketId', (req, res, next) => {
	res.status(200).json({
		message: 'Ticket created',
		ticketId: req.params.ticketId
	});
});

// Delete a ticket by ID
router.delete('/:ticketId', (req, res, next) => {
	res.status(200).json({
		message: 'Ticket deleted',
		ticketId: req.params.ticketId
	});
});

module.exports = router;