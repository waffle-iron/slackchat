const express = require('express');
const router = express.Router();
const models = require('./../../models');


router.get('/', (req, res) => {
  models.getAccounts(accounts => {
    res.send(accounts);
  });
});

router.get('/:team_id', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }).then( account => {
    res.send(account);
  });
});

module.exports = router;