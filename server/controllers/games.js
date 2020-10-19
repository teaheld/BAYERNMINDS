const Game = require('../models/game');

module.exports.newGame = async(req, res, next) => {
    try {
        const newGame = await Game.newGame();

        res.json(newGame);
    } catch (err) {
        next(err);
    }
}

module.exports.getTries = async(req, res, next) => {
    const gameId = req.params.gameId;

    try {
        const tries = await Game.getTries(gameId);

        res.json(tries);
    } catch (err) {
        next(err);
    }
}

module.exports.postTry = async(req, res, next) => {
    const gameId = req.params.gameId;
    const currentSolution = req.body.currentSolution;

    try {
        const guessed = await Game.countGuessed(gameId, currentSolution);

        res.json(guessed);
    } catch (err) {
        next(err);
    }
}