const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/signup', controller.signup);
router.post('/set-role', require('../middleware/verifyFirebaseToken'), controller.setRole);
router.post('/whoami', require('../middleware/verifyFirebaseToken'), controller.whoami);

module.exports = router;
