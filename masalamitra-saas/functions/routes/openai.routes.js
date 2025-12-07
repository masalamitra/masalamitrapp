const express = require('express');
const router = express.Router();
const controller = require('../controllers/openai.controller');

router.post('/chat', controller.chat);

module.exports = router;
