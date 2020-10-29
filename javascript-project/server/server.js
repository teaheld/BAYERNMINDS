const express = require('express');
const mongoose = require('mongoose');
/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');*/

mongoose.connect(`mongodb://localhost:27017/bayernminds`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connected to the database bayernminds!`);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const port = 3001;
const app = express();

app.use(express.json({ extended: false }));
/*
app.use(bodyParser.urlencoded({ extended: true }));*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const Score = require('./score.model');

app.get('/scores', (req, res) => {
    Score.find({}, (err, scores) => {
        if (err) {
            console.error(err);
        }

        res.send(scores);
    });
});

app.post('/scores', (req, res) => {
    const score = new Score({
        name: req.body.name,
        score: req.body.score
    });

    score.save((err) => {
        if (err) {
            console.error(err);
        }
        res.send('Success');
    });
});


app.listen(port, () => console.log(`Server is listening on port ${ port }!`));