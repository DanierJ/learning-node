const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};
exports.getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id - 1;
  // eslint-disable-next-line no-shadow
  const tour = tours.find(tour => tour.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
exports.createTour = (req, res) => {
  //console.log(req.body);
  //res.send('Done.');
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) return console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
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

exports.checkID = (req, res, next, val) => {
  const id = val - 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
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
