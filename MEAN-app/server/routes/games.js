const express = require('express');
const router = express.Router();

const controllers = require('../controllers/games');

router.get('', controllers.newGame);
router.get('/:gameId/tries', controllers.getTries);
router.post('/:gameId/tries', controllers.postTry);
router.get('/:gameId/solution', controllers.getSolution);
router.delete('/:gameId', controllers.removeGame);

module.exports = router;