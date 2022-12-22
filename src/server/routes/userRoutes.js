const express = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/orders', authController.protect, userController.getUserOrders);

router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);

module.exports = router;
