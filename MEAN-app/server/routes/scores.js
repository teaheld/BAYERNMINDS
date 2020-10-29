const express = require('express');
const router = express.Router();

const controllers = require('../controllers/scores');

router.post('', controllers.addScore);

module.exports = router;