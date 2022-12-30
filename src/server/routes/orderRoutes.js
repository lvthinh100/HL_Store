const express = require('express');
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.get('/', authController.protect, orderController.getOrder);

// router.post('/', orderController.createOrder);
router.delete('/', orderController.deleteOrder);
router.post('/', authController.protect, orderController.addOrder);
router.patch('/:id', orderController.updateOrder);

module.exports = router;
