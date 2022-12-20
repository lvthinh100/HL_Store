const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: 
  [
    {
      name_product: {
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
  name_customer: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  sdt: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: false,
  },
  method: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);