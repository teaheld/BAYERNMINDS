const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let users = [{
        "name": "Tea",
        "score": 1000
    },
    {
        "name": "Milos",
        "score": 2
    }
];

app.get('/users', (request, response) => {
    response.send(users);
});

const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

app.post('/users', [jsonParser, textParser], (request, response) => {
    const requestBody = request.body;
    users.push({
        name: requestBody.name,
        score: requestBody.score
    });

    response.send('Success');
});

app.listen(port, () => console.log(`Server is listening on port ${ port }!`));