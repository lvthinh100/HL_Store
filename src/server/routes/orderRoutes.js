const express = require('express');
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.createOrder);
router.delete('/', orderController.deleteOrder);
router.patch('/updateOrder/:id', orderController.updateOrder);
router.patch('/updateStatusOrder/:id', authController.protect, authController.restrictTo('admin'), orderController.updateStatusOrder);
module.exports = router;
