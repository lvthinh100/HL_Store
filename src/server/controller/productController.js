// const productModel = require('../model/productModel');

// exports.getProducts = async (req, res) => {
//   const data = await productModel.find().populate({
//     path: 'comments',
//   });
//   //   .populate({
//   //     path: 'comments',
//   //   });
//   res.status(200).json({
//     status: 'success',
//     data,
//   });
// };

// exports.createProducts = async (req, res) => {
//   const data = req.body;
//   const response = await productModel.create(data);

//   res.status(200).json({
//     status: 'success',
//     data: response,
//   });
// };

// exports.deleteProducts = async (req, res) => {
//   const data = req.body;
//   const response = await productModel.findByIdAndDelete(data.id);

//   res.status(200).json({
//     status: 'success',
//     data: response,
//   });
// };

// exports.updateProduct = async (req, res) => {
//   const data = req.body;
//   const { id } = req.params;
//   const docs = await productModel.findByIdAndUpdate(id, data, {
//     new: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: docs,
//   });
// };
