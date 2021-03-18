const express = require('express');
const controller = require('../controllers/domain');
const router = express.Router();

router.get('/getDomain', controller.getDomain)

module.exports = router;
