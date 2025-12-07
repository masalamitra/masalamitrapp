const express = require('express');
const router = express.Router();
router.get('/fetch', (req,res)=>res.json({ ok:true, ads: [] }));
module.exports = router;
