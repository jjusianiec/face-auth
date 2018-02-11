const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

module.exports = (req, res) => {
  const params = {
    CollectionId: config.collectionId,
    FaceMatchThreshold: config.faceMatchThreshold,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(req.body.image),
    },
    MaxFaces: 1,
  };
  rekognition.searchFacesByImage(params, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.status(200).send(data).end();
  });
};
