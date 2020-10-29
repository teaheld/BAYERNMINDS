const mongoose = require('mongoose');


const scoreSchema = mongoose.Schema({
    name: {
        type: String
    },
    score: {
        type: Number
    }
});


const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;