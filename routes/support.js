const express = require('express');
const router = express.Router();
const support = require('../controller/support');

router.post('/', support.sendProblem);

module.exports = router;
