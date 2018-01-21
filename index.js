const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');
const config = require('./config/config');
const bodyParser = require('body-parser');
const atob = require('atob');

AWS.config.update({ region: config.region });
const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const app = express();
app.use(express.static('public'));
app.use(bodyParser({ limit: '50mb' }));

app.post('/login', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post('/register', (req, res) => {
  console.log(req.body.image.range);
  const params = {
    CollectionId: config.collectionId,
    Image: {
      Bytes: getBinary(req.body.image),
    },
  };
  rekognition.indexFaces(params, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.send(data).end();
  });
});

app.post('/init', async (req, res) => {
  rekognition.createCollection({ CollectionId: config.collectionId }, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.send(data).end();
  });
});

function getBinary(encodedFile) {
  const base64Image = encodedFile.split('data:image/png;base64,')[1];
  const binaryImg = atob(base64Image);
  const length = binaryImg.length;
  const ab = new ArrayBuffer(length);
  const ua = new Uint8Array(ab);
  for (let i = 0; i < length; i++) {
    ua[i] = binaryImg.charCodeAt(i);
  }
  return ab;
}

module.exports.handler = serverless(app);
