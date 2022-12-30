const factory = require('./factoryHandler');
const userModel = require('../model/userModel');
const orderModel = require('../model/orderModel');
const productModel = require('../model/productModel');

exports.getUser = factory.getOne(userModel);
exports.updateUser = factory.updateOne(userModel);

exports.getUserOrders = async (req, res, next) => {
  const userId = req.user.id;
  //Muon lay tat ca order status la dang van chuyen
  const orders = await orderModel.find({ user: userId });
  //Lấy thông tin order của 1 user
  // const data = await userModel.findById(userId).populate({
  //   path: 'orders',
  //   select: 'products totalAmount address',
  // });
  res.status(200).json({
    data: orders,
    userId: req.user.id,
  });
};

exports.addCart = async (req, res, next) => {
  res.status(200).json({
    data: 'Add thanh cong roi ne',
  });
};

exports.updateCart = async (req, res, next) => {
  const resData = await userModel.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.status(200).json({
    data: resData,
  });
};

exports.getCart = async (req, res, next) => {
  const userId = req.user.id;
  const { cart } = await userModel.findById(userId).select('cart').lean();
  const productsId = [...cart].map((c) => c.id);

  const inStocks = await productModel
    .find({ _id: { $in: productsId } })
    .select('size');

  const newCart = [...cart].map((item) => {
    const itemStockIndex = inStocks.findIndex((st) => st.id === item.id);
    const newItem = {
      ...item,
      inStock: [...inStocks[itemStockIndex].size],
    };
    return newItem;
  });
  res.status(200).json({
    status: 'success',
    data: newCart,
  });
};
