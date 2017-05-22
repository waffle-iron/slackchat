const express = require('express');
const accounts = require('./accounts');
const embed = require('./embed');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json());

router.use('/embed', embed);
router.use('/accounts', accounts);

module.exports = router;
