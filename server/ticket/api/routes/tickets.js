const express = require('express');
const router = express.Router();

const TicketsController = require('../controllers/tickets');

// Get all tickets
router.get('/', TicketsController.get_all);

// Create a ticket
router.post('/', TicketsController.create);

// Get a ticket by ID
router.get('/:ticketId', TicketsController.get_one);

// Update a ticket by ID
router.patch('/:ticketId', TicketsController.update);

// Delete a ticket by ID
router.delete('/:ticketId', TicketsController.delete);

module.exports = router;