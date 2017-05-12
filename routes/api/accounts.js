const express = require('express');
const router = express.Router();
const Account = require('./../../models/Account');


router.get('/', (req, res) => {
  Account.find({}, (err, accounts) => {
    if (err) { return res.send(500); }
    res.send(accounts);
  });
});

router.get('/:team_id', (req, res) => {
  const team_id = req.params.team_id;
  Account.findOne({ team_id }, (err, account) => {
    if (err) { return res.send(500); }
    res.send(account);
  });
});

module.exports = router;