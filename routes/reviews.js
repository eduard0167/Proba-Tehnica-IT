const Review = require('../models/Review');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    const reviews = await Review.find({});
    res.send(reviews);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const reviewById = await Review.findOne({_id: id});

    if (reviewById === null) {
        res.status(404);
    }

    res.send(reviewById);
});

router.post('/', async (req, res) => {
    const {message, user_id} = req.body;
    try {
        const newReview = new Review({message: message, user_id: user_id});
        await newReview.save();

        const userById = await User.findById(user_id);
        userById.reviews.push(newReview);
        await userById.save();

        res.send(newReview);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
        return res.status(400).send("Message not found!");
    }

    const reviewById = await Review.findByIdAndUpdate(id, {message: message}, {new: true});

    if (reviewById === null) {
        return res.status(404).send("Review not found!");
    }

    res.send(reviewById);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const reviewById = await Review.findOneAndDelete({_id: id});

    if (reviewById === null) {
        res.status(404);
    }
    
    const userById = await User.findById(reviewById.user_id);
    userById.reviews.filter(value => value !== id);

    await userById.save();
    res.send(reviewById);    
});


module.exports = router;