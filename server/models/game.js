const mongoose = require('mongoose');
const Field = require('./field');

const gameSchema = mongoose.Schema({
    currentTry: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    field0: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Field
    },
    field1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Field
    },
    field2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Field
    },
    field3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Field
    }
});

gameSchema.statics.newGame = async function() {
    const fields = await Field.getPlayers();

    const field0 = fields[Math.floor(Math.random() * 6)]._id;
    const field1 = fields[Math.floor(Math.random() * 6)]._id;
    const field2 = fields[Math.floor(Math.random() * 6)]._id;
    const field3 = fields[Math.floor(Math.random() * 6)]._id;

    const game = new this({
        field0,
        field1,
        field2,
        field3
    });

    const newGame = await game.save();

    return newGame;
}

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;