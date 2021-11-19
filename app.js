const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const app = express();
app.use(express.urlencoded({ extended: true })); // parse from URL


mongoose.connect('mongodb://localhost:27017/probaIT', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected!");
    })
    .catch((err) => {
        console.log("Oh no, something went wrong with Mongo!");
        console.log(err);
    });


app.get('/contact-requests', async (req, res) => {
    // const c1 = new Contact({user: 'eduard0167', name: 'eduard', email: 'eduard@gmail.com', message: 'oare merge?'});
    // await c1.save();
    // const c2 = new Contact({user: 'john01', name: 'john', email: 'john@yahoo.com', message: 'merge ba'});
    // await c2.save();
    const contacts = await Contact.find({});
    res.send(contacts);
});

app.get('/contact-requests/:id', async (req, res) => {
    const { id } = req.params;
    const contactById = await Contact.findOne({_id: id});

    if (contactById === null) {
        res.status(404);
    }

    res.send(contactById);
});

app.post('/contact-requests', async (req, res) => {
    const {user, name, email, message} = req.body;
    try {
        const newContact = new Contact({user: user, name: name, email: email, message: message});
        await newContact.save();

        res.send("Created");
    } catch (err) {
        res.status(400);
        res.send(err);
    }
});

app.patch('/contact-requests/:id', async (req, res) => {
    const { id } = req.params;
    const { is_resolved } = req.body;
    const contactById = await Contact.findOne({_id: id});

    if (contactById === null) {
        res.status(404);
    } else {
        contactById.is_resolved = is_resolved;
    }

    res.send(contactById);
});

app.delete('/contact-requests/:id', async (req, res) => {
    const { id } = req.params;
    
    const contactById = await Contact.findOneAndDelete({_id: id});

    if (contactById === null) {
        res.status(404);
    }
    
    res.send(contactById);    
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});

