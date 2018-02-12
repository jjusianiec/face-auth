const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');
const userRepository = require('./userRepository');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

const login = async (image) => {
  const params = {
    CollectionId: config.collectionId,
    FaceMatchThreshold: config.faceMatchThreshold,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(image),
    },
    MaxFaces: 1,
  };
  const searchByFaceResult = await rekognition.searchFacesByImage(params).promise();
  if (searchByFaceResult.FaceMatches.length === 0) {
    throw {
      status: 404,
      message: 'Could not find user with given face',
    };
  }
  return userRepository.findByFaceId(searchByFaceResult.FaceMatches[0].Face.FaceId);
};

module.exports = {
  login,
};
