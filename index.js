const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const app = express();
app.use(express.static('public'));
app.use(bodyParser({ limit: '50mb' }));
app.use('/rest', router);

app.use((err, req, res) => {
  res.status(err.status || 500).send({ message: err.message }).end();
  console.log(err);
});

module.exports.handler = serverless(app);
