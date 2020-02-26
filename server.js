const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const port = 3001;
const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'db';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/users', (request, response) => {
    let users = [];

    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);

        const db = client.db(dbName);
        let cursor = db.collection('users').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);

            users.push(doc);
        }, () => {
            client.close();

            response.send(users);
        });
    });
});

const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

app.post('/users', [jsonParser, textParser], (request, response) => {
    const user = {
        name: request.body.name,
        score: request.body.score
    };

    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);

        const db = client.db('db');
        db.collection('users').insertOne(user, (err, res) => {
            assert.equal(null, err);

            client.close();
        });
    });

    response.send('Success');
});

app.listen(port, () => console.log(`Server is listening on port ${ port }!`));