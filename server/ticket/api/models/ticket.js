const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	faculty_id: String,
	applicant_id: Number,
	status: String,
	date: { type: Date, default: Date.now},
	d_or_i: Boolean
});

module.exports = mongoose.model('Ticket', ticketSchema);