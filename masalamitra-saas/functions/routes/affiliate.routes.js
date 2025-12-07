const express = require('express');
const router = express.Router();
const controller = require('../controllers/affiliate.controller');
const verify = require('../middleware/verifyFirebaseToken');

router.post('/create', verify, controller.createAffiliate);
router.get('/earnings', verify, controller.getEarnings);

module.exports = router;
