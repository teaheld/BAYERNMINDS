const mongoose = require('mongoose');
const Field = require('./field');

const gameSchema = mongoose.Schema({
    currentTry: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    tries: [{
        tryIndex: {
            type: Number,
            // 6th try is the actual solution
            enum: [0, 1, 2, 3, 4, 5, 6],
            default: 6
        },
        fields: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Field,
            default: []
        }]
    }]
});

gameSchema.statics.newGame = async function() {
    const allFields = await Field.getPlayers();

    const fields = Array.from(Array(4), (el) => allFields[Math.floor(Math.random() * 6)]._id);

    const game = new this({
        tries: {
            fields
        }
    });

    const newGame = await game.save();
    await newGame.populate('tries.fields').execPopulate();

    return newGame;
}

gameSchema.statics.getTries = async function(gameId) {
    const tries = this.findById(gameId, 'tries -_id').exec();

    return tries;
}

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;