const Field = require('../models/field');

module.exports.getPlayers = async(req, res, next) => {
    try {
        const players = await Field.getPlayers();

        res.json(players);
    } catch (err) {
        next(err);
    }
}