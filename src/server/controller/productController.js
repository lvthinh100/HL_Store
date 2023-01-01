const multer = require('multer');
const sharp = require('sharp');

const productModel = require('../model/productModel');
// const commentModel = require('../model/commentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./factoryHandler');

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

exports.updateProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const docs = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: docs,
  });
});

//Lay thong tin product bằng ID product
exports.getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const data = await productModel.findById(productId).populate({
    path: 'comments',
  });
  // =>> nó sẽ lấy ra tất cả các comment có productId = _id mình truyền vao

  res.status(200).json({
    status: 'success',
    data,
  });
});

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

exports.searchProduct = async (req, res, next) => {
  const { key } = req.params;

  const data = await productModel.find({
    name: { $regex: key, $options: 'i' },
  });
  res.status(200).json({
    status: 'success',
    data,
  });
};

exports.deleteProductByID = async (req, res, next) => {
  const idProduct = req.params.id;

  const response = await productModel.findByIdAndDelete(idProduct);

  res.status(200).json({
    status: 'success',
    data: response,
  });
};
exports.searchCategoryProd = async (req, res, next) => {
  const { key } = req.params;

  const data = await productModel.find({ category: key });
  res.status(200).json({
    status: 'success',
    data: data,
  });
};

exports.searchRate = async (req, res, next) => {
  const data = await productModel.find().sort('-ratingsAverage').limit(6);
  res.status(200).json({
    status: 'success',
    data,
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('400', 'Not an image !!! Please try again'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.fields([{ name: 'image', maxCount: 1 }]);
exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.files.image) return next();
  //Cover image
  req.body.image = `product-${req.params.id}-${Date.now()}.jpeg`;
  await sharp(req.files.image[0].buffer)
    .resize(1426, 2100)
    .toFormat('jpeg')
    .jpeg({ quality: 98 })
    .toFile(`public/img/products/${req.body.image}`);
  next();
});

exports.updateProduct = factory.updateOne(productModel);
exports.getAllProducts = factory.getAll(productModel);
