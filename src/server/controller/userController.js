const factory = require('./factoryHandler');
const userModel = require('../model/userModel');
const orderModel = require('../model/orderModel');

exports.getUser = factory.getOne(userModel);
exports.updateUser = factory.updateOne(userModel);

exports.getUserOrders = async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user.id });
  res.status(200).json({
    orders,
  });
};
