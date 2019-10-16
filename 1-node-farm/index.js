// Reading file system(fs module)
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', "utf-8");

console.log(textIn);


