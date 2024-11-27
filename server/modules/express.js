const express = require('express');
const app = express();

const userModel  = require('../DB/user.model.js');

app.get('/', (req, res) => {
    try {
        res.status(200).send('Welcome');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(8080, console.log('API started successfully'));