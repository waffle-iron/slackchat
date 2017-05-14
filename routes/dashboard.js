const express = require('express');
const router = express.Router();
const Account = require('./../models/Account');

const hasActiveSession = (req, res, next) => {
  if (req.session.teamId && req.session.teamId === req.params.team_id) {
    next();
  } else {
    res.redirect('/');
  }
};


router.get('/:team_id/dashboard/analytics', hasActiveSession, (req, res) => {
  const team_id = req.params.team_id;
  Account.findOne({ team_id }).then((account) => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/analytics', account);
  });
});

router.get('/:team_id/dashboard/widget', hasActiveSession, (req, res) => {
  const team_id = req.params.team_id;
  Account.findOne({ team_id }).exec().then(account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/widget', account);
  });
});

router.get('/:team_id/dashboard/settings', hasActiveSession, (req, res) => {
  const team_id = req.params.team_id;
  Account.findOne({ team_id }).exec().then(account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/settings', account);
  });
});

router.get('/:team_id/dashboard/payments', hasActiveSession, (req, res) => {
  const team_id = req.params.team_id;
  Account.findOne({ team_id }).exec().then(account => {
    if (!account) {return res.sendStatus(404);}
    res.render('dashboard/payments', account);
  });
});

module.exports = router;