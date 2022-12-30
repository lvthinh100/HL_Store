const express = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/orders', authController.protect, userController.getUserOrders);
router.patch('/updateCart', authController.protect, userController.updateCart);
router.get('/getCart', authController.protect, userController.getCart);
router.post(
  '/addCart',
  authController.protect,
  authController.restrictTo('user'),
  userController.addCart
);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);

module.exports = router;
