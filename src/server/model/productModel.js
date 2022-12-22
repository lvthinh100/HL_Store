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
    id: {
      type: String,
      required: true,
    },
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
      required: true,
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
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'product',
  localField: '_id',
});

module.exports = mongoose.model('Product', productSchema);
