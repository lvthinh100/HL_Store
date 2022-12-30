const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: String,
      name: {
        type: String,
        require: true,
      },
      size: {
        type: String,
        require: true,
      },
      image: String,
      discount: {
        type: Number,
        default: 0,
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
  totalAmount: {
    type: Number,
    require: true,
  },
  nameCustomer: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  phone: {
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
  user: {
    type: mongoose.Schema.ObjectId,
    path: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // voucher: {
  //   type: mongoose.Schema.ObjectId,
  //   path: 'Voucher',
  // },
});

module.exports = mongoose.model('Order', orderSchema);
