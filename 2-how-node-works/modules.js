//console.log(arguments);
//console.log(require('module').wrapper);
// module.exports
const Calculator = require('./test-module-1');

const myCalc1 = new Calculator();

console.log(myCalc1.add(2, 3));


// exports
const calculator2000 = require('./test-module-2');
const {add, subtract, divide, multiply} = require('./test-module-2');

console.log(calculator2000.add(20, 5));

console.log(add(20, 50));
console.log(subtract(20, 50));
console.log(multiply(20, 50));
console.log(divide(20, 50));

// caching
require('./test-module-3')();
require('./test-module-3')();
