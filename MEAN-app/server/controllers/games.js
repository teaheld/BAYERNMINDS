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

module.exports.getSolution = async(req, res, next) => {
    const gameId = req.params.gameId;

    try {
        const tries = await Game.getTries(gameId);

        const solution = tries.tries.find(tri => tri.tryIndex === 6).fields;

        let score = tries.tries.find(el => el.completelyGuessed === 4);
        if (score) {
            console.log(score);
            score = 6000 - score.tryIndex * 1000;

        } else {
            score = 0;
            //score = 6000 - score.tryIndex * 1000;
        }

        res.json({ solution, score });
    } catch (err) {
        next(err);
    }
}

module.exports.removeGame = async(req, res, next) => {
    const gameId = req.params.gameId;

    try {
        await Game.removeGame(gameId);

        res.json({ msg: 'Ok' });
    } catch (err) {
        next(err);
    }
}