const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');
const config = require('./config/config');
const bodyParser = require('body-parser');

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
  console.log(req.body);
  res.status(200).end();
});

app.post('/init', async (req, res) => {
  rekognition.createCollection({ CollectionId: config.collectionId }, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.send(data).end();
  });
});


module.exports.handler = serverless(app);
