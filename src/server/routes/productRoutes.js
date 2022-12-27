const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.post('/', productController.createProducts);

//Tang luot like
router.patch(
  '/upLike/:id',
  authController.protect,
  authController.restrictTo('admin'),
  productController.increaseProductLike
);

//Giam luot like
router.patch(
  '/downLike/:id',
  authController.protect,
  authController.restrictTo('admin'),
  productController.decreaseProductLike
);

//Lay thong tin product bang ID
router.get('/:id', productController.getProductById);

//Tim kiem product bang tu khoa
router.get('/search/:key', productController.searchProd);

//Admin them mat hang
router.post(
  '/products',
  authController.protect,
  authController.restrictTo('admin'),
  productController.createProduct
);

module.exports = router;
