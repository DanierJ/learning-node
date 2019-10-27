const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const port = process.env.PORT || 3100;


// console.log(app.get('env')); // environment
// console.log(process.env);
// NODE_ENV=development nodemon server.js

app.listen(port, () => console.log(`App running on port ${port}...`));
