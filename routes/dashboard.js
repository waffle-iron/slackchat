const express = require('express');
const router = express.Router();
const models = require('./../models');


router.get('/:team_id/dashboard/analytics', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/analytics', account);
  });
});

router.get('/:team_id/dashboard/widget', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/widget', account);
  });
});

router.get('/:team_id/dashboard/settings', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/settings', account);
  });
});

module.exports = router;