const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    /*results: tours.length,
    data: {
      tours
    }*/
  });
};
exports.getTour = (req, res) => {
  // console.log(req.params);
  // const id = req.params.id - 1;
  // eslint-disable-next-line no-shadow
  // const tour = tours.find(tour => tour.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      // tour
    }
  });
};
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour
    }
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.checkBody = (req, res, next) => {
  if (!(req.body.price && req.body.name)) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid body'
    });
  }
  next();
};