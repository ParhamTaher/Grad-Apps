const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Applicant', applicantSchema);