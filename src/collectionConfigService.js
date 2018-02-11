const HttpStatus = require('http-status-codes');
const wrap = require('express-async-wrapper');
const config = require('../config/config');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const initCollection = (req, res) => {
  rekognition.createCollection({ CollectionId: config.collectionId }, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.send(data).end();
  });
};

const removeAllFaces = wrap(async (req, res) => {
  const collectionModel = { CollectionId: config.collectionId };
  await rekognition.deleteCollection(collectionModel).promise();
  await rekognition.createCollection(collectionModel).promise();
  res.status(HttpStatus.NO_CONTENT).end();
});

module.exports = {
  initCollection,
  removeAllFaces,
};
