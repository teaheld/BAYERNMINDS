const Game = require('../models/game');

module.exports.newGame = async(req, res, next) => {
    try {
        const newGame = await Game.newGame();

        res.json(newGame);
    } catch (err) {
        next(err);
    }
}