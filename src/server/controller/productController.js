const productModel = require('../model/productModel');

exports.getProducts = async (req, res) => {
  const data = await productModel.find().populate({
    path: 'comments',
  });
  //   .populate({
  //     path: 'comments',
  //   });
  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.createProducts = async (req, res) => {
  const data = req.body;
  const response = await productModel.create(data);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};

// exports.deleteProducts = async (req, res) => {
//   const data = req.body;
//   const response = await productModel.findByIdAndDelete(data.id);

//   res.status(200).json({
//     status: 'success',
//     data: response,
//   });
// };

exports.updateProduct = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const docs = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: docs,
  });
};

//Lay thong tin product bằng ID product
exports.getProductById = async (req, res, next) => {
  const productId = req.params.id;
  const data = await productModel.findById(productId).populate({
    path: 'comments',
    select: 'rating userName comment',
  });
  // =>> nó sẽ lấy ra tất cả các comment có productId = _id mình truyền vao

  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.increaseProductLike = async (req, res, next) => {
  //
  const idProduct = req.params.id;
  let { like } = await productModel.findById(idProduct).select('like'); // { id, like }
  like += 1;

  const newProd = await productModel.findByIdAndUpdate(
    idProduct,
    {
      like,
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: newProd,
  });
  //
};

exports.searchProd = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Search value day ne',
  });
};
