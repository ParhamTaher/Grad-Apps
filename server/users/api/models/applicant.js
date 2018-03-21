const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    fname: { type: String, required: true },
    lname: { type: String, required: true },
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

module.exports = mongoose.model('applicant', applicantSchema);