const mongoose = require('mongoose');

const Field = require('../models/field');


const connectToDB = (database = 'bayernminds') => {
    mongoose.connect(`mongodb://localhost:27017/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(`Connected to the database ${database}!`);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
};


module.exports = { connectToDB };