const express = require('express');
const router = express.Router();

const controllers = require('../controllers/games');

router.get('', controllers.newGame);

module.exports = router;