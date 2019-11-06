const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.']
  }
});

const Tour = mongoose.model('Tour', tourSchema);


const app = require('./app');

const port = process.env.PORT || 3100;

// console.log(app.get('env')); // environment
// console.log(process.env);
// NODE_ENV=development nodemon server.js

app.listen(port, () => console.log(`App running on port ${port}...`));
