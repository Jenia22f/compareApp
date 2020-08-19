const express = require('express');
const controller = require('../controllers/url');
const router = express.Router();

router.post('/getUrl', controller.getUrl)
// router.get('/getusers', controller.getUsers)

module.exports = router;