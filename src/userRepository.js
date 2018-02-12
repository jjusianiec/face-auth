const AWS = require('./awsProvider');

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

const tableName = 'user';

const findByFaceId = faceId => docClient.get({
  TableName: tableName,
  Key: {
    faceId,
  },
}).promise();

const save = user => docClient.put({
  TableName: tableName,
  Item: user,
}).promise();

const deleteUser = faceId => docClient.delete({
  TableName: tableName,
  Key: {
    faceId,
  },
}).promise();

module.exports = {
  findByFaceId, save, deleteUser,
};
