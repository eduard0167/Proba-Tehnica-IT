const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    message: {
        type: String,
        maxLength: 500,
        required: true
    },
    user_id: {
        type: String,
        maxLength: 24,
        minlength:24
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;