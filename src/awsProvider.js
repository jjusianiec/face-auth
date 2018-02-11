const AWS = require('aws-sdk');
const config = require('../config/config');

AWS.config.setPromisesDependency(require('bluebird'));

AWS.config.update({ region: config.region });

module.exports = AWS;
