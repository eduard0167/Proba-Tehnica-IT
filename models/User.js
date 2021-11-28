const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Review = require('./Review');

const userSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        maxLength: 50,
        validate: [validator.validate, 'invalid email'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    },
    role: {
        type: String,
        enum: ['teacher', 'student']
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;