const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/rest', router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message }).end();
  console.log(err);
});

module.exports.handler = serverless(app);
