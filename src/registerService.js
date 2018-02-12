const config = require('../config/config');
const base64ImageToAWSCompatibleFormat = require('./base64ImageToAWSCompatibleFormat');
const AWS = require('./awsProvider');
const loginService = require('./loginService');
const HTTPStatus = require('http-status-codes');
const userRepository = require('./userRepository');

const rekognition = new AWS.Rekognition({ apiVersion: config.rekognitionVersion });

async function throwExceptionIfUserAlreadyRegistered(registerModel) {
  const loginResponse = { FaceMatches: [] };
  try {
    const loginResponse = await loginService.login(registerModel.image);
  } catch (e) {

  }
  if (loginResponse.FaceMatches.length > 0) {
    throw {
      status: HTTPStatus.FORBIDDEN,
      message: 'User already registered!',
    };
  }
}

function registerFaceInCollection(registerModel) {
  const params = {
    CollectionId: config.collectionId,
    Image: {
      Bytes: base64ImageToAWSCompatibleFormat(registerModel.image),
    },
  };
  return rekognition.indexFaces(params).promise();// 16a70fc6-9ef0-4bfb-b484-cf5bb312b7de
}

const register = async (registerModel) => {
  await throwExceptionIfUserAlreadyRegistered(registerModel);
  const registerFaceResponse = await registerFaceInCollection(registerModel);
  return userRepository.save({
    name: registerModel.name,
    faceId: registerFaceResponse.FaceRecords[0].Face.FaceId,
  });
};

module.exports = {
  register,
};
