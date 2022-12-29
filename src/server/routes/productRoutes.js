const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

//Comment API
const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProducts);
router.patch(
  '/:id',
  productController.uploadProductImage,
  productController.resizeProductImage,
  productController.updateProduct
);
router.patch(
  '/upLike/:id',
  authController.protect, // đăng nhập
  authController.restrictTo('admin'),
  productController.increaseProductLike
);
router.get('/:id', productController.getProductById);
router.get('/search/:key', productController.searchProduct);
router.get('/search/:key', productController.searchProd);
router.get('/searchCategory/:key', productController.searchCategoryProd);
router.get('/searchRate/hightRate', productController.searchRate);
router.delete(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('admin'), 
  productController.deleteProductByID
);

module.exports = router;
