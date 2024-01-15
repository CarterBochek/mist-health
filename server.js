const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// SSL Certificate
const privatekey = fs.readFileSync('./private.key', 'utf8');
const publiccrt = fs.readFileSync('./public.crt', 'utf8');

const credentials = {
    key: privatekey,
    cert: publiccrt
};

// instance of express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

// User model definition
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String
}));

app.post('/register', async (req, res) => {
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Create HTTPS server with the credentials
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => console.log('HTTPS Server running on port 3000'));