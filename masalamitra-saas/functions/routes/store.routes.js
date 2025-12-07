const express = require('express');
const router = express.Router();
const controller = require('../controllers/store.controller');
const verify = require('../middleware/verifyFirebaseToken');
const roles = require('../middleware/roles');

router.post('/', verify, roles(['vendor','superadmin']), controller.createStore);
router.get('/:id', controller.getStorePublic);
router.get('/', controller.listStores);

module.exports = router