const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');
// Create Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: [40, 'name less or equal to 40'],
      minLength: [10, 'name more or equal to 10'],
      // validate: [validator.isAlpha, 'tour name only contain character']
    },
    slug: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      required: true,
      default: 5,
      min: [1, 'rating must above 1.0'],
      max: [5, 'rating must below 5.0'],
      set: (curVal) => +curVal.toFixed(1),
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must has price'],
    },
    duration: {
      type: Number,
      required: [true, 'Tour must have duration'],
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        description: String,
        coordinates: [Number],
        address: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have maxGroupSize'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty either easy medium or difficult',
      },
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.price;
        },
        message: 'discount price ({VALUE}) below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

//Query middleware this point to the query
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({
//     $match: {
//       secretTour: { $ne: true },
//     },
//   });
//   next();
// });

//Create Model
module.exports = mongoose.model('Tour', tourSchema);
