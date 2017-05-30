const express = require('express');
const bodyParser = require('body-parser');
const Account = require('./../models/Account');
const querystring = require('querystring');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

const hasActiveSession = (req, res, next) => {
  if (req.session.teamId && req.session.teamId === req.params.team_id) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/:team_id/dashboard/analytics', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  const openTab = req.query.tab || 'all';
  const queryParams = querystring.stringify({
    chats: (openTab === 'all' || openTab === 'missed'),
    missed: (openTab === 'missed'),
  });
  const chartDataUrl = `${process.env.SLACKCHAT_API_URL}/visitors/${teamId}?${queryParams}`;
  Account.findOne({ team_id: teamId }).then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/analytics', Object.assign(account, { openTab, chartDataUrl }));
  });
});

router.get('/:team_id/dashboard/widget', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/widget', account);
  });
});

router.get('/:team_id/dashboard/settings', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/settings', account);
  });
});

router.post('/:team_id/dashboard/settings', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  Account.findOneAndUpdate(
    { team_id: teamId },
    { settings: req.body },
    { upsert: false }, (err, account) => {
      if (err) { return res.send(500); }
      return res.redirect(`/${account.team_id}/dashboard/settings`);
    });
});

router.get('/:team_id/dashboard/payments', hasActiveSession, (req, res) => {
  const teamId = req.params.team_id;
  Account.findOne({ team_id: teamId }).exec().then((account) => {
    if (!account) { return res.sendStatus(404); }
    return res.render('dashboard/payments', account);
  });
});

module.exports = router;
