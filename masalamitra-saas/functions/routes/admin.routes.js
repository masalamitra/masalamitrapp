const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyFirebaseToken');
const roles = require('../middleware/roles');
const controller = require('../controllers/admin.controller');

router.get('/stats', verify, roles(['superadmin']), controller.stats);
router.get('/users', verify, roles(['superadmin']), controller.listUsers);

module.exports = router;