const express = require('express');
const orderController = require('../controller/orderController');

//Comment API
const router = express.Router();

router.get('/', orderController.getOrder);
router.post('/', orderController.createOrder);
router.delete('/', orderController.deleteOrder);
router.patch('/:id', orderController.updateOrder);

module.exports = router;
