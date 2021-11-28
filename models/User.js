const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require("bcrypt");

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
        maxLength: 50,
        required: true
    },
    role: {
        type: String,
        enum: ['teacher', 'student']
    }
});

userSchema.pre('save', async function(next) {
      const hash = await bcrypt.hash(this.password, 8);
  
      this.password = hash;
      next();
    }
  );

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, user.password);
}
  

const User = mongoose.model('User', userSchema);

module.exports = User;