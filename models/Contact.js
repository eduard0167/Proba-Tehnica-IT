const mongoose = require('mongoose');
const validator = require("email-validator");

const contactSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        maxLength: 50,
        validate: [validator.validate, 'invalid email'],
        required: true  
    },
    message: {
        type: String,
        maxLength: 5000,
        required: true
    },
    is_resolved: {
        type: Boolean,
        default: false
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;