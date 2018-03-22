const mongoose = require('mongoose');
const validate = require('mongoose-validator')

let emailValidator = 
    validate({
        validator: 'isEmail',
        message: 'Please provide a correct email',
    });

let lengthValidator = 
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'This field should be between {ARGS[0]} and {ARGS[1]} characters',
    });

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	role: { 
        type: String,
        enum: ['Faculty', 'FSS', 'Budget Director', 'Associate Chair graduate', 'Grad office staff'],
        required: true
    },
    fname: { type: String, required: true, validate: lengthValidator },
    lname: { type: String, required: true, validate: lengthValidator },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: emailValidator
    },
    password: { type: String, required: true },
	creation_date: { 
		type: Date, 
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);