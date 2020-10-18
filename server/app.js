const express = require('express');
// Creating Express.js app
const app = express();

const connectToDB = require('./configurations/database').connectToDB;
// Connecting to the database
connectToDB();

const Field = require('./models/field');
Field.addPlayers();

// This middleware is for using req.body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('Ok');
});

module.exports = app;