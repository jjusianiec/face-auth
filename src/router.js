const express = require('express');
const loginService = require('./loginService');
const registerService = require('./registerService');
const collectionConfigService = require('./collectionConfigService');
const wrap = require('express-async-wrapper');

const router = express.Router();

router.post('/login', wrap(async (req, res) => {
  res.send(await loginService.login(req.body.image));
}));

router.post('/register', wrap(async (req, res) => {
  res.send(await registerService.register(req.body));
}));

router.post('/initCollection', wrap(async (req, res) => {
  res.send(await collectionConfigService.initCollection());
}));

router.post('/removeAllFaces', wrap(async (req, res) => {
  res.send(await collectionConfigService.removeAllFaces());
}));

module.exports = router;

