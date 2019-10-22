const fs = require('fs');
const server = require('http').createServer();


server.on('request', (req, res) => {
  // Solution 1 too big
  /*fs.readFile('./test-file.txt', (err, data) => {
    if(err) console.log(err);
    res.end(data);
  });*/

  // Solution 2: Streams backPressure problem
  /*const readable = fs.createReadStream('./test-file.txt');

  readable.on('data', chunk => {
    res.write(chunk);
  });

  readable.on('end', () => {
    res.end();
  });
  readable.on('error', err => {
    console.log(err);
    res.statusCode = 500;
    res.end('Something went wrong!');
  });*/

  // Solution 3
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writeableDestination)


});

server.listen(2525, 'localhost', () => {
  console.log('Listening...');
});
