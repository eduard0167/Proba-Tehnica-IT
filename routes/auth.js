require('dotenv').config();

const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateRegister = require('../middleware/validations');

router.post('/register', async (req, res) => {
    try {
        const err = validateRegister(req.body);
        if (err) {
            throw err;
        }

        const {email, firstname, lastname, password, role} = req.body;
        const hash = await bcrypt.hash(password, 8);
        const newUser = new User({lastname, firstname, email, password: hash, role});
        await newUser.save();
        
        res.send(newUser);
    } catch (err) {
        res.send(err);
    }
});

router.post('/login', async (req, res) => {
    const status = 200;
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET);
            res.status(status).send(token);
        } else {
            status = 401;
            throw "Wrong credentials!";
        }
    } catch (err) {
        res.status(status).send(err);
    }
});

module.exports = router;