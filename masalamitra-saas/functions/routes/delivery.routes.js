const express = require('express');
const router = express.Router();
const controller = require('../controllers/delivery.controller');
const verify = require('../middleware/verifyFirebaseToken');
const roles = require('../middleware/roles');

router.post('/assign', verify, roles(['superadmin','admin']), controller.assignCourier);
router.post('/proof', verify, roles(['delivery']), controller.uploadProof);
router.get('/tasks', verify, roles(['delivery']), controller.listTasks);

module.exports = router;