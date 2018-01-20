const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');

const rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports.handler = serverless(app);