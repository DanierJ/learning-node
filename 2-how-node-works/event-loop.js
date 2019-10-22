const fs = require('fs');
const crypto = require('crypto');

// set thread pool size

const start = Date.now();
//process.env.UV_THREADPOOL_SIZE = 2;
// set UV_THREADPOOL_SIZE=4 & node event-loop.js

setTimeout(() => {
  console.log('Timer 1 finished');
}, 0);

setImmediate(() => {
  console.log('Immediate 1 finished')
});

fs.readFile('./test-file.txt', () => {
  console.log('I/O finished');
  console.log('--------------------');


  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('process.nexTick()'));

  //console.time('test');
  crypto.pbkdf2('password', 'salt', 100000, 1020, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
   // console.timeEnd('test');
  });

 // console.time('test2');
  crypto.pbkdf2('password', 'salt', 100000, 1020, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
   // console.timeEnd('test2');
  });

  //console.time('test3');
  crypto.pbkdf2('password', 'salt', 100000, 1020, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
   // console.timeEnd('test3');
  });

  //console.time('test4');
  crypto.pbkdf2('password', 'salt', 100000, 1020, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
    //console.timeEnd('test4');
  });
});

console.log('Hello from the top level code');



