const express = require('express');
const loginService = require('./loginService');
const registerService = require('./registerService');
const collectionConfigService = require('./collectionConfigService');

const router = express.Router();

router.post('/login', loginService);
router.post('/register', registerService);
router.post('/initCollection', collectionConfigService.initCollection);
router.post('/removeAllFaces', collectionConfigService.removeAllFaces);

module.exports = router;

