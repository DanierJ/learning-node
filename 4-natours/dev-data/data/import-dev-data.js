const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('Error connecting with DB');
    // eslint-disable-next-line no-console
    console.log(err);
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    // eslint-disable-next-line no-console
    console.log('Data successfully loaded.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  process.exit();
};

// DElETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // eslint-disable-next-line no-console
    console.log('Data successfully deleted.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
