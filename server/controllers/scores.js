const Score = require('../models/score');

module.exports.addScore = async(req, res, next) => {
    const name = req.body.name;
    const score = req.body.score;

    try {
        await Score.addScore(name, score);

        res.json({ msg: 'Ok' });
    } catch (err) {
        next(err);
    }
}