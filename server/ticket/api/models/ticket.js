const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var status_history_schema = new Schema({
	status: { 
		type: String,
		enum: ['initial', 'granted', 'offer-request', 'offer-pending', 'accepted', 'refused']
	},
	update_date: Date
},{ _id : false });

var ticket_schema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	faculty_id: { type: String, required: true },
	applicant_id: Number,
	status: { 
		type: String,
		enum: ['initial', 'granted', 'offer-request', 'offer-pending', 'accepted', 'refused'],
		default: 'initial',
		required: true
	},
	creation_date: { 
		type: Date, 
		default: Date.now
	},
	ticket_type: { 
		type: String, 
		enum: ['D', 'I'],
		uppercase: true,
		required: true 
	},
	status_history: {
		type: [status_history_schema],
		default: [{
			status: 'initial',
			update_date: new Date()
		}]
	}
});

module.exports = mongoose.model('Ticket', ticket_schema);