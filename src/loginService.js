const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const login = (image) => {
  const params = {
    CollectionId: config.collectionId,
    FaceMatchThreshold: config.faceMatchThreshold,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(image),
    },
    MaxFaces: 1,
  };
  return rekognition.searchFacesByImage(params).promise();
  //   , (err, data) => {
  //   if (err) res.status(500).send(err).end();
  //   else res.status(200).send(data).end();
  // });
};

module.exports = {
  login,
};
