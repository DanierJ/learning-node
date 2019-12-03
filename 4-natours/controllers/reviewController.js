const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError.js');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(
    /*{
    review: req.body.review,
    rating: req.body.rating,
    user: req.user._id
  }*/ req.body
  );

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});
