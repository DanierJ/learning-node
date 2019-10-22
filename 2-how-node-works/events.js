const EventEmitter = require('events');
const http = require('http');

// const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const  myEmitter = new Sales();


// Subscriber
myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Costumer name: Jonas');
});

myEmitter.on('newSale', (stock, jojo) => {
  console.log(`There are now ${stock} items in stock.`);
  /*console.log(`${jojo.name} ${jojo.lastName} is the kindest JoJo.`);*/
});

const jojo = {
  name: 'Jonathan',
  lastName: 'Joestar'
};

// Publisher
myEmitter.emit('newSale', 9, jojo);

///////////////////////////

const server = http.createServer();


server.on('request', (request, respond) => {
  console.log('Request received!');
  respond.end('Request received.');
});

server.on('request', (request, respond) => {
  console.log('Another request received!');
 // respond.end('Another request received.');
});


server.on('close', () => {
  console.log('Server closed.');
});

server.listen(3254, 'localhost', () => {
  console.log('Waiting for requests...');
});
