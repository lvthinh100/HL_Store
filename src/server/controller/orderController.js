const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');

exports.getOrder = async (req, res) => {
  const { role } = req.user;
  let data;
  if (role === 'admin') {
    data = await orderModel.find().sort('-createdAt');
  } else {
    data = await orderModel.find({ user: req.user.id }).sort('-createdAt');
  }
  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.createOrder = async (req, res) => {
  const data = req.body;
  const response = await orderModel.create(data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

exports.deleteOrder = async (req, res) => {
  const data = req.body;
  const response = await orderModel.findByIdAndDelete(data.id);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

exports.updateOrder = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const docs = await orderModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: docs,
  });
};

exports.addOrder = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  const { cart } = await userModel.findById(userId).select('cart');
  const order = {
    products: cart,
    status: 'UNCONFIRMED',
    nameCustomer: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    note: data.note ? data.note : '',
    method: data.method,
    user: userId,
    totalAmount: data.total ? data.total : 0,
  };
  const response = await orderModel.create(order);
  // const newOrder = await orderModel.findByIdAndUpdate(
  //   response.id,
  //   {
  //     totalAmount: data.products[0].price * data.products[0].quantity,
  //     nameCustomer: userr.name,
  //     email: userr.email,
  //     phone: userr.phone,
  //     address: userr.address,
  //     user: userr._id,
  //   },
  //   { new: true }
  // );
  res.status(200).json({
    status: 'success',
    data: response,
  });
};
