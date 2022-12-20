// const commentModel = require('../model/commentModel');

// exports.getComments = async (req, res) => {
//   const data = await commentModel.find();

//   res.status(200).json({
//     status: 'success',
//     data,
//   });
// };

// exports.createComments = async (req, res) => {
//   const data = req.body;
//   const response = await commentModel.create(data);

//   res.status(200).json({
//     status: 'success',
//     data: response,
//   });
// };

// exports.deleteComments = async (req, res) => {
//   const data = req.body;
//   const response = await commentModel.findByIdAndDelete(data.id);

//   res.status(200).json({
//     status: 'success',
//     data: response,
//   });
// };

// exports.updateComments = async (req, res) => {
//   const data = req.body;
//   const { id } = req.params;
//   const docs = await commentModel.findByIdAndUpdate(id, data, {
//     new: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: docs,
//   });
// };
