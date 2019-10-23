const fs = require('fs');
const superagent = require('superagent');




fs.readFile('./dog.txt', (err, data) => {
  const hound = data.toString().trim();
  superagent.get(`https://dog.ceo/api/breed/${hound}/images/random`).end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
  });
});


