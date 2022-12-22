const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: [
    {
      name: {
        type: String,
        require: true,
      },
      size: {
        type: String,
        require: true,
      },
      discount: {
        type: Number,
        require: false,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: false,
      },
    },
  ],
  status: {
    type: String,
    require: true,
  },
  total_amount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
