const mongoose = require('mongoose');
const validate = require('mongoose-validator')

let emailValidator = 
    validate({
        validator: 'isEmail',
        message: 'Please provide a correct email',
    })

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	role: { 
        type: String,
        enum: ['Faculty', 'FSS', 'Budget Director', 'Associate Chair graduate', 'Grad office staff'],
        required: true
    },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: emailValidator
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
	creation_date: { 
		type: Date, 
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);