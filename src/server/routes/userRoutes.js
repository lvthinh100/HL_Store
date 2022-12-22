const express = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//request => req     req.testValue=9999         ------req--------------
router.get('/orders', authController.protect, userController.getUserOrders);

router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.post('/addCart', authController.protect, userController.addCart);

module.exports = router;
