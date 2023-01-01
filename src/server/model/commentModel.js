const mongoose = require('mongoose');
const productModel = require('./productModel');

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.statics.calcAvgRating = async function (proId) {
  const stats = await this.aggregate([
    {
      $match: {
        product: proId,
      },
    },
    {
      $group: {
        _id: '$product',
        nRating: {
          $sum: 1,
        },
        avgRating: {
          $avg: '$rating',
        },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await productModel.findByIdAndUpdate(proId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await productModel.findByIdAndUpdate(proId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

commentSchema.post('save', function () {
  this.constructor.calcAvgRating(this.product);
});

module.exports = mongoose.model('Comment', commentSchema);
