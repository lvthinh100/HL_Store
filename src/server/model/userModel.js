const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Please insert valid email'],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password are not the same',
      },
    },
    name: {
      type: String,
      required: [true, 'Please Enter name'],
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
    },
    phone: {
      type: String,
      required: [true, 'Please give phone number'],
      validate: [validator.isMobilePhone, 'Please insert valid phone number'],
    },
    cart: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          require: true,
        },
        image: {
          type: String,
          default: '/img/model.jpg',
        },
        size: {
          type: String,
          enum: ['S', 'M', 'L', 'XL'],
        },
        quantity: Number,
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async function (checkPass, curPass) {
  return await bcrypt.compare(checkPass, curPass);
};

module.exports = mongoose.model('User', userSchema);
