const express = require('express');
const router = express.Router();
const controller = require('../controllers/razorpay.controller');

router.post('/create-order', controller.createOrder);
router.post('/webhook', controller.webhook);

module.exports = router;