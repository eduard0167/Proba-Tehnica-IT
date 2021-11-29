require('dotenv').config();

const Class = require('../models/Class');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const { verifyTeacher, verifyStudent } = require("../middleware/authorization");

router.get('/', async (req, res) => {
    const classes = await Class.find().populate('students');

    if (classes === null) {
        res.status(404);
    }

    res.send(classes);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const ClassById = await Class.findOne({_id: id}).populate('students');

    if (ClassById === null) {
        res.status(404);
    }

    res.send(ClassById);
});

router.post('/', verifyTeacher, async (req, res) => {
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

router.post('/:id/enroll', verifyStudent, async (req, res) => {
    const { id } = req.params;
    const classById = await Class.findById(id);

    const user = await User.findById(req.user._id);

    user.classes.push(classById);
    classById.students.push(user);

    await classById.save();
    await user.save();
    
    res.send(classById);
});


module.exports = router;