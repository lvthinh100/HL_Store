const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.post('/', productController.createProducts);


router.patch(
  '/upLike/:id',
  authController.protect,
  authController.restrictTo('admin'),
  productController.increaseProductLike
);
router.get('/:id', productController.getProductById);
router.get('/search/:key', productController.searchProd);
router.delete(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('admin'), 
  productController.deleteProductByID
);

module.exports = router;
