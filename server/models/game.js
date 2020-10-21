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
    const tries = await this.findById(gameId, 'tries -_id').exec();

    return tries;
}

gameSchema.statics.getSolution = async function(gameId) {
    const solution = (await this.findById(gameId, 'tries -_id').populate('tries.fields').exec()).tries.find(tri => tri.tryIndex === 6).fields;

    return solution;
}


gameSchema.statics.countGuessed = async function(gameId, currentSolution) {
    const game = await this.findById(gameId).exec();

    await game.addTry(currentSolution);

    const countInSolution = await game.countInSolution(6);
    const countInCurrentSolution = await game.countInSolution();
    const completelyGuessed = await game.countCompletelyGuessed();

    const guessed = countInSolution.map((sol, i) => { return Math.min(sol, countInCurrentSolution[i]) })
        .reduce((sum, el) => { return sum + el; });

    return { completelyGuessed, partialyGuessed: guessed - completelyGuessed };
}

gameSchema.methods.countInSolution = async function(index) {
    index = index | this.currentTry;
    const players = await Field.getPlayers();
    const solution = this.tries.find(tri => tri.tryIndex === index).fields;

    return players.map((player) => {
        return (solution.filter((sol) => { return player._id.equals(sol) })).length
    });
}

gameSchema.methods.countCompletelyGuessed = async function() {
    const currentSolution = this.tries.find(tri => tri.tryIndex === this.currentTry).fields;
    const solution = this.tries.find(tri => tri.tryIndex === 6).fields;

    return currentSolution.filter((currSol, i) => {
        return currSol.equals(solution[i])
    }).length;
}

gameSchema.methods.addTry = async function(currentSolution) {
    this.tries.push({ tryIndex: this.currentTry, fields: currentSolution });
}

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;