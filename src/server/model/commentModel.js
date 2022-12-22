const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
