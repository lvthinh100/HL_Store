const factory = require('./factoryHandler');
const userModel = require('../model/userModel');
const orderModel = require('../model/orderModel');

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
