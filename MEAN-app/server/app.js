const express = require('express');
// Creating Express.js app
const app = express();

const connectToDB = require('./configurations/database').connectToDB;
// Connecting to the database
connectToDB();

// This middleware is for using req.body
app.use(express.json({ extended: false }));

// Client can access these resources 
const path = require('path');
app.use("/images", express.static(path.join("database/images")));

// Cors Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PUT, PATCH, DELETE'
        );

        return res.status(200).json({});
    }

    next();
});

const playersRoutes = require('./routes/players');
app.use('/players', playersRoutes);
const gamesRoutes = require('./routes/games');
app.use('/games', gamesRoutes);
const scoresRoutes = require('./routes/scores');
app.use('/scores', scoresRoutes);

module.exports = app;