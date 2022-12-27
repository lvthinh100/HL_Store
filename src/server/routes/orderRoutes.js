const express = require('express');
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.createOrder);
router.delete('/', orderController.deleteOrder);
router.patch('/:id/updateOrder', orderController.updateOrder);
router.patch('/:id/updateStatusOrder', authController.protect, authController.restrictTo("admin"), orderController.updateStatusOrder);
module.exports = router;
