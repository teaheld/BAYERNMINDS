const express = require('express');
const router = express.Router();

const controllers = require('../controllers/players');

router.get('', controllers.getPlayers);

module.exports = router;