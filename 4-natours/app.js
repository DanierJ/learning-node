const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3100;

/// 1 MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

// applied to each and every single request.
app.use((req, res, next) => {
  console.log('Hello from the middleware.');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2. ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};
const getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id - 1;

  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }



  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
const createTour = (req, res) => {
  //console.log(req.body);
  //res.send('Done.');
  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) return console.log(err);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }});
  });
};
const updateTour = (req, res) => {

  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};
const deleteTour = (req, res) => {

  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

// 3. ROUTES
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);


/*
app.use((req, res, next) => {
  console.log('Hello from the middleware.');
  next();
});
*/


app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4. SERVER
app.listen(port, () => console.log(`App running on port ${port}...`));




