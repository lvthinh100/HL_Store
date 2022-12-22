const productModel = require("../model/productModel");

exports.getProducts = async (req, res) => {
  const data = await productModel.find().populate({
    path:'comments',
  });
    
    res.status(200).json({
      status: 'success',  
      data,
    })
};

exports.createProducts = async (req, res) => {
  const data = req.body; // lay du lieu tu ng dung gui leen
  // console.log(data);
  const response = await productModel.create(data)
  res.status(200).json({
    status: 'success',  
    data,
  })
};
exports.deleteProducts = async (req, res) => {
  const data = req.body; // lay du lieu tu ng dung gui len
  // console.log(data);
  const response = await productModel.findByIdAndDelete(data.id)
  res.status(200).json({
    status: 'success',  
    data: response,
  }) 
};
exports.updateProduct = async (req, res) => {
  const data = req.body; // lay du lieu tu ng dung gui len
  const {id} = req.params;
  // console.log(param);
  const docs = await productModel.findByIdAndUpdate(id, data, { 
    new: true,
  });
  res.status(200).json({
    status: 'success',  
    data,
  })
};