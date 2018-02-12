const config = require('../config/config');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const initCollection = () => {
  return rekognition.createCollection({CollectionId: config.collectionId}).promise();
};

const removeAllFaces = async () => {
  const collectionModel = { CollectionId: config.collectionId };
  await rekognition.deleteCollection(collectionModel).promise();
  return rekognition.createCollection(collectionModel).promise();
};

module.exports = {
  initCollection,
  removeAllFaces,
};
