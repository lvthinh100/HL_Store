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
