require('dotenv').config();

const Class = require('../models/Class');
const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authorization");

router.get('/', async (req, res) => {
    const classes = await Class.find();

    if (classes === null) {
        res.status(404);
    }

    res.send(classes);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const ClassById = await Class.findOne({_id: id});

    if (ClassById === null) {
        res.status(404);
    }

    res.send(ClassById);
});

router.post('/', verifyToken, async (req, res) => {
    const teacher_id = req.user._id;
    const { description, subject } = req.body;

    const newClass = new Class({description: description, subject: subject, teacher_id: teacher_id});
    await newClass.save();
    
    res.send(newClass);
});

router.patch('/:id', async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).send();
    }

    const tutoringClass = await Class.findByIdAndUpdate(id, {description: description}, {new: true});

    if (!tutoringClass) {
        return res.status(404).send();
    }

    res.status(200).send(tutoringClass);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const ClassById = await Class.findOneAndDelete({_id: id});

    if (!ClassById) {
        res.status(404);
    }
    
    res.send(ClassById);    
});


module.exports = router;