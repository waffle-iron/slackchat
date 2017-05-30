const express = require('express');
const accounts = require('./accounts');
const visitors = require('./visitors');
const embed = require('./embed');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json());

router.use('/embed', embed);
router.use('/accounts', accounts);
router.use('/visitors', visitors);

module.exports = router;
