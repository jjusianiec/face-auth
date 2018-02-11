const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

module.exports = (req, res) => {
  const params = {
    CollectionId: config.collectionId,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(req.body.image),
    },
  };
  rekognition.indexFaces(params, (err, data) => {
    if (err) res.status(500).send(err).end();
    else res.send(data).end();
  });// 16a70fc6-9ef0-4bfb-b484-cf5bb312b7de
};
