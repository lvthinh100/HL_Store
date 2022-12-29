const commentModel = require('../model/commentModel');
const catchAsync = require('../utils/catchAsync');

exports.getComments = async (req, res) => {
  const data = await commentModel.find();

  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.createComments = catchAsync(async (req, res) => {
  const data = req.body;
  const { user } = req;
  const response = await commentModel.create({ ...data, userName: user.name });

  res.status(200).json({
    status: 'success',
    data: response,
  });
});

exports.deleteComments = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const response = await commentModel.findByIdAndDelete(id, data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

exports.updateComments = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const docs = await commentModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: docs,
  });
};
exports.addComments = async (req, res) => {
  const data = req.body;
  const response = await commentModel.create(data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};
