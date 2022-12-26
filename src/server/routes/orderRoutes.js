const express = require('express');
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.createOrder);
router.delete('/', orderController.deleteOrder);
router.patch('/:id', orderController.updateOrder);
router.post('/orders', authController.protect, orderController.addOrder);
module.exports = router;
