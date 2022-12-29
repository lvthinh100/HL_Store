const orderModel = require('../model/orderModel');

exports.getOrder = async (req, res) => {
  const data = await orderModel.find();

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
  const userr = req.user;

  const response = await orderModel.create(data);
  const newOrder = await orderModel.findByIdAndUpdate(
    response.id,
    {
      totalAmount: data.products[0].price * data.products[0].quantity,
      nameCustomer: userr.name,
      email: userr.email,
      phone: userr.phone,
      address: userr.address,
      user: userr._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: newOrder,
  });
};
