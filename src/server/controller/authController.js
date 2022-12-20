// const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
// const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendUser = (user, statusCode, res) => {
  const token = signToken(user._id);
  const expiresDate = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  );
  const cookieOptions = {
    expires: expiresDate,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  // if (process.env.DOT_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    tokenExpires: expiresDate,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, role, phone, address } =
    req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    role,
    address,
    phone,
  });
  //await new Email(newUser, url).sendWelcome();
  createSendUser(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //Check for email and password
  if (!email || !password) {
    return next(new AppError(400, 'Invalid email or password'));
  }
  //Check for user and pass
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError(401, 'Wrong email or password'));
  }
  //send back token
  createSendUser(user, 200, res);
});

exports.logout = (req, res) => {
  res
    .cookie('jwt', 'loggedOut', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .status(200)
    .json({ status: 'success' });
};

//Kiem tra user đăng nhập hay chưa
//Neu dang nhap roi thi luu user vao req
//Chua thi tra ve loi middleware
exports.protect = catchAsync(async (req, res, next) => {
  //Get token from header or cookies
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError(401, 'Please log in to access this feature'));
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check user
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError(401, 'User not exist'));
  }

  //Check change pass after get the token
  // if (freshUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError(401, 'User has changed password! Please log in again')
  //   );
  // }
  req.user = freshUser;
  next();
});
