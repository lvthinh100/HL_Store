const express = require('express');

const provinceInfoController = require('../controller/provinceInfoController');

const router = express.Router();
router.get('/', provinceInfoController.getAllProvince);
router.get('/district/:code', provinceInfoController.getDistrictInProvince);
router.get('/ward/:code/:id', provinceInfoController.getWard);

module.exports = router;
