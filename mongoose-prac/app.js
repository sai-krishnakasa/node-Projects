const mongoose = require('mongoose')
const { user } = require('./models/User')
const express = require('express')

mongoose.connect('mongodb+srv://user:test1234@mydb.r7wjpqq.mongodb.net/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection events
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app = express()
app.listen(8000, () => {
    console.log("Server Started")
})

app.get('/', async (req, res) => {
    const users = await user.find();
    return res.status(200).json();
})

app.get('/create', async (req, res) => {
    try {
        await user.create({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            age: 25,
            is_active: true
        })
    }
    catch (err) {
        console.log(err);
    }
    res.redirect('/');
})

module.exports = db;


