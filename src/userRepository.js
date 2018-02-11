const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'user';

const findByFaceId = faceId => docClient.get({
  TableName: tableName,
  Key: {
    faceId,
  },
});

const save = user => docClient.put({
  TableName: tableName,
  Item: user,
});

const deleteUser = id => docClient.delete({
  TableName: tableName,
  Key: {
    id,
  },
});

module.exports = {
  findByFaceId, save, deleteUser
};
