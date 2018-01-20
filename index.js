const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');
const config = require('./config/config');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports.handler = serverless(app);