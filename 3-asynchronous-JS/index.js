const fs = require('fs');
const superagent = require('superagent');


const readFilePro = file => {
  return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
          if (err) reject('I could not find that file.');
          resolve(data);
        });
  });
};

const writeFilePro = (file, data) => {
  return new Promise(((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write the file');
      resolve('success');
    });
  }));
};

/*fs.readFile('./dog.txt', (err, data) => {
  const hound = data.toString().trim();
  superagent
    .get(`https://dog.ceo/api/breed/${hound}/images/random`)
    .then(res => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
  }).catch(err => {
    return console.log(err.message);
  });
});*/

// Promises
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    const hound = data.toString().trim();

    return superagent.get(`https://dog.ceo/api/breed/${hound}/images/random`)})
      .then(res => writeFilePro('dog-img.txt', res.body.message))
      .then(data => console.log(data))
      .catch(err => console.log(err));
*/

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`),
          hound = data.toString().trim(),
          res = await superagent.get(`https://dog.ceo/api/breed/${hound}/images/random`);
  
    console.log(await writeFilePro('dog-img.txt', res.body.message));
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
