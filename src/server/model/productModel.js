// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   size: [
//     {
//       name: String,
//       quantity: Number,
//     },
//   ],
//   //Mang cac id "cua" comment
//   //Khong don thuan la chuoi => Mot doi tuong dac biet do Mongo tao ra de quan ly id
//   comments: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'Comment',
//     },
//   ],
//   role: {
//     type: String,
//     enum: ['Customer', 'Admin'],
//   },
// });

// module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: [
      {
        name: String,
        quantity: Number,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    category: [String],
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      required: true,
      default: 0,
      min: [1, 'rating must above 1.0'],
      max: [5, 'rating must below 5.0'],
      set: (curVal) => +curVal.toFixed(1),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual field
// comments [ idComment ];
productSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'product', //Khóa ngoại (Khóa bên ngoài Model)
  localField: '_id', //Khóa ở bên trong Model
});
/*
Select rating userName comment from Product
Join Comment on Product._id = Comment.productId

=> [ { productId = 6384d20a3e161d6510dac1ab }, {productId = 6384d20a3e161d6510dac1ab} ]
sau dó nó truyền vào comments trong product.

*/

module.exports = mongoose.model('Product', productSchema);
