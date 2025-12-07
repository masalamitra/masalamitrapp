const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const verify = require('../middleware/verifyFirebaseToken');
const roles = require('../middleware/roles');

router.post('/', verify, roles(['customer']), controller.createOrder);
router.post('/:id/accept', verify, roles(['vendor']), controller.vendorAccept);
router.post('/:id/assign', verify, roles(['superadmin','admin']), controller.assignDelivery);
router.post('/:id/status', verify, roles(['delivery','vendor','superadmin']), controller.updateStatus);
router.get('/:id', verify, controller.getOrder);

module.exports = router;