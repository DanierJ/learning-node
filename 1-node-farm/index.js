
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
/*const server = http.createServer((request, response) => {
 // console.log(request);
  response.end('Hello from the server!'); // here we're sending a response.
});

// 2. We need to start the server.
server.listen(8585, '127.0.0.1', () => {
  console.log('Listening to request on port: 8585');
});*/

//////////////// ROUTING ///////////////////////
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const productData = JSON.parse(data);


const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);

    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%PRODUCT_ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%ORGANIC%}/g, 'not-organic');

    return output;
};

const server = http.createServer((request, response) => {


  const {query, pathname} = url.parse(request.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {


    response.writeHead(200, {
      'Content-type': 'text/html'
    });

    const cardsHTML = productData.map(product => replaceTemplate(tempCard, product)).join(''); // without join also works
    const finalOverview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);

    response.end(finalOverview);


  // Product page
  } else if(pathname === '/product') {
    const product = productData[query.id];

    response.writeHead(200, {
      'Content-type': 'text/html'
    });

    const finalProduct = replaceTemplate(tempProduct, product);

    response.end(finalProduct);

  // API
  } else if(pathname === '/api') {
      response.writeHead(200, {
        'Content-type': 'application/json'
      });
      response.end(data);

  // NOT FOUND
  } else {
    response.writeHead(404, {
      // headers
      'Content-type': 'text/html',
      'my-own-header': 'hi-header'
    });
    response.end('<h1>Page not found!</h1>');
  }
});

server.listen(3630, 'localhost', () => {
  console.log('Listening to request on port: 3630');
});


