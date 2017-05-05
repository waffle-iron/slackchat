const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  models.getAccounts(accounts => {
    res.send(accounts);
  });
});

router.get('/:team_id', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    res.render('account', account);
  });
});

module.exports = router;