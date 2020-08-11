const express = require('express');
const controller = require('../controllers/url');
const router = express.Router();

router.post('/getUrl', controller.getUrl)

module.exports = router;