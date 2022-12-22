const express = require('express');
const voucherController = require('../controller/voucherController');

//Comment API
const router = express.Router();

router.post('/', voucherController.createVouchers);
router.get('/', voucherController.getVouchers);
router.delete('/:id', voucherController.deleteVouchers);
router.patch('/:id', voucherController.updateVouchers);

module.exports = router;
