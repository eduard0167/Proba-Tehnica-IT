const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');
const classesRoutes = require('./routes/tutoring-classes');

const app = express();
app.use(express.urlencoded({ extended: true })); // parse from URL
app.use('/contact-requests', contactRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/tutoring-classes', classesRoutes);

mongoose.connect('mongodb://localhost:27017/probaIT', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected!");
    })
    .catch((err) => {
        console.log(err);
    });
    

app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});

