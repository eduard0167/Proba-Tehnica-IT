const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    subject: {
        type: String,
        maxLength: 80,
        required: true
    },
    description: {
        type: String,
        maxLength: 500,
        required: true
    },
    teacher_id: {
        type: String,
        maxLength: 24,
        minlength:24
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;