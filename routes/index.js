const express = require('express');
const router = express.Router();
const models = require('./../models');
const slackAuth = require('./../services/slackAuth');
const path = require('path');
const fs = require('fs');


const rawBundle = fs.readFileSync(path.join(__dirname, '../public', 'chindow', 'bundle.js'));

router.get('/', (req, res) => {
  if (req.query.code) {
    slackAuth
      .getAccessToken(req.query.code)
      .then(response => {
        if (response.data.ok === true) {
          models.addAccount(response.data, () => {
            const token = response.data.access_token;
            res.redirect('/accounts');
          });
        }
      })
  } else {
    res.render('index.ejs' );
  }
});


router.get('/dashboard/analytics', (req, res) => { res.render('dashboard/analytics');});
router.get('/dashboard/widget', (req, res) => { res.render('dashboard/widget');});
router.get('/dashboard/settings', (req, res) => { res.render('dashboard/settings');});


router.get('/accounts', (req, res) => {
  models.getAccounts(accounts => {
    res.send(accounts);
  });
});

router.get('/accounts/:team_id', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    // res.send(account);
    res.render('account', account);
  });
});

router.get('/embed/:team_id/', (req, res) => {
  const team_id = req.params.team_id;
  const config = { team_id };
  res.send(`window.SlackChat = {teamId: ${team_id}}; ${rawBundle}`);
});


// ------------- SIGNOUT -------------
router.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(response => {
      res.redirect('/');
    })
})

// ------------- SETUP -------------
router.get('/setup', (req, res) => {
  res.render('setup.ejs');
});

module.exports = router;