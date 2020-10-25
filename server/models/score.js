const mongoose = require('mongoose');


const scoreSchema = mongoose.Schema({
    name: {
        type: String
    },
    score: {
        type: Number
    }
});

scoreSchema.statics.addScore = async function(name, score) {
    const newScore = new this({
        name,
        score
    });

    await newScore.save();
}

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;