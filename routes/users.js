const User = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find({}, {password: false}).populate('reviews');
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const userById = await User.findOne({_id: id}, {password: false}).populate('reviews');

    if (userById === null) {
        res.status(404);
    }

    res.send(userById)
});

router.patch('/:id', async (req, res) => {
    let status = 200;

    try {
        const { id } = req.params;
        let user = null;

        if (req.body.firstname) {
            user = await User.findByIdAndUpdate(id, {$set: {firstname: req.body.firstname}});
        }

        if (req.body.lastname) {
            user = await User.findByIdAndUpdate(id, {$set: {lastname: req.body.lastname}});
        }

        if (req.body.email) {
            user = await User.findByIdAndUpdate(id, {$set: {email: req.body.email}});
        }

        if (req.body.role && req.body.role === "teacher" || req.body.role === "student") {
            user = await User.findByIdAndUpdate(id, {$set: {role: req.body.role}});
        } else {
            status = 401;
        }

        if (req.body.password && req.body.password === req.body.confirmation_password) {
            user = await User.findById(id);
            user.password = req.body.password;
            await user.save();
        } else {
            status = 401;
        }
    
        if (user) {
            res.status(status).send(user);
        } else {
            status = 404;
            throw "Invalid id";
        }

    } catch (err) {
        res.status(status).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const userById = await User.findOneAndDelete({_id: id});

    if (userById === null) {
        res.status(404);
    }
    
    res.send(userById);  
});

module.exports = router;