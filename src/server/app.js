//package
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

//utils
const AppError = require('./utils/AppError');
// const GlobalErrorHandler = require('./controller/errorController');

//router
// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const viewRouter = require('./routes/viewRoutes');

const app = express();

//Serving static file
app.use(express.static(path.join(__dirname, 'public')));

//Dev log
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') console.log('Working in Production');

//rate limit
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request to this ip!! Try again in an hour',
});

app.use('/api', limiter);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//Cookie parser
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against xss
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingQuantity',
      'difficulty',
      'price',
    ],
  })
);

//Check request time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);

//Global error handler
app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server`));
});

// app.use(GlobalErrorHandler);

module.exports = app;
