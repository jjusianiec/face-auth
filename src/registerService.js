const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const register = (registerModel) => {
  const params = {
    CollectionId: config.collectionId,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(registerModel.image),
    },
  };
  rekognition.indexFaces(params).promise();// 16a70fc6-9ef0-4bfb-b484-cf5bb312b7de
};

module.exports = {
  register,
};
