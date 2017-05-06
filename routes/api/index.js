const express = require('express');
const router = express.Router();
const accounts = require('./accounts');
const embed = require('./embed');

router.use('/embed', embed);
router.use('/accounts', accounts);

module.exports = router;