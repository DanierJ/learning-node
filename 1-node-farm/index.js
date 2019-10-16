
///////////////// Reading file system(fs module) - Blocking, synchronous way. ////////////
/*const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', "utf-8");
//console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

//console.log('File written!');


//////////////////// Non-blocking, asynchronous way /////////////////
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR!');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
      //console.log(`data2: ${data2}`);
      fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
       //   console.log(`data3: ${data3}`);
          fs.writeFile('./txt/final.txt', `${data2}\n ${data3}` , err => {
       //     console.log('Your file has been written.')
          })
      });
    });
});*/
// console.log('Your file is being read');

/////////////////// Creating a simple web server //////////////////////
const http = require('http');

/**
 * In order to built our server
 *
 * 1. We create the server.
 * 2. We start the server.
 */

// 1. We create the server, the callback it's hit with every new request.
const server = http.createServer((request, response) => {
 // console.log(request);
  response.end('Hello from the server!'); // here we're sending a response.
});

// 2. We need to start the server.
server.listen(8585, '127.0.0.1', () => {
  console.log('Listening to request on port: 8585');
});


