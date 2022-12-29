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

exports.updateStatusOrder = async (req, res) => {
  const orderID = req.params.id;
  const curStatus = req.body.status;
  const docs = await orderModel.findByIdAndUpdate(orderID, { status: curStatus }, {new: true, });

  res.status(200).json({
    status: "success",
    data: docs,
  });
};
