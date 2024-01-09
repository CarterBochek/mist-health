const express = require('express');
const expressBodyParser = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// instance of express
const app = express();
// Be sure that the path is correct
app.use(express.static(__dirname + '/public'));
app.use(expressBodyParser.urlencoded({ extended: true }));
app.use(expressBodyParser.json());

mongoose.connect('mongodb://localhost/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

// User model definition
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String
}));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash the password
    const user = new User({ email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).send("User Registered Successfully");
    } catch (error) {
        res.status(500).send('An error occurred while registering the user');
    }
});

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.listen(3000, () => console.log('Server is running on localhost:3000'));