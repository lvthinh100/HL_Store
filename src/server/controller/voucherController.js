const { response } = require('../app');
const voucherModel = require('../model/voucherModel');
const commentModel = require('../model/voucherModel');

exports.getVouchers = async (req, res) => {
  const data = await voucherModel.find();

  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.createVouchers = async (req, res) => {
  const data = req.body;
  const response = await voucherModel.create(data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

exports.deleteVouchers = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const response = await voucherModel.findByIdAndDelete(id, data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

exports.updateVouchers = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const docs = await voucherModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: docs,
  });
};
