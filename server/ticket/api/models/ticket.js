const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	faculty_id: { type: String, required: true },
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
	domestic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);