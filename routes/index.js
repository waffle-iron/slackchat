const express = require('express');
const router = express.Router();
const axios = require('axios');
const models = require('./../models');
const slackAuth = require('./../services/slackAuth');
const querystring = require('querystring');
const SLACK_API_URL = 'https://slack.com/api';
const dasboardController = require('./dashboard');
const api = require('./api');

router.use('/', dasboardController);
router.use('/api', api);


router.get('/', (req, res) => {
  if (req.query.code) {
    slackAuth
      .getAccessToken(req.query.code)
      .then(response => {
        if (response.data.ok === true) {
          const token = response.data.access_token;
          axios.post(`${SLACK_API_URL}/team.info`, querystring.stringify({ token }))
            .then(({ data }) => {
              const account = Object.assign({}, response.data, {icon: data.team.icon});
              models.addAccount(account).then(() => {
                // the response is structured differently for login vs signup
                const team_id = response.data.team_id || response.data.team.id;
                res.redirect(`/${team_id}/dashboard/analytics`);
              });
            });
        }
      });
  } else {
    res.render('index.ejs' );
  }
});

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


router.get('/api/accounts', (req, res) => {
  models.getAccounts(accounts => {
    models.incrementVisitorCount({team_id:'sdfdsf'}, ()=> {
      console.log('hahaaaaa');
      
    });
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

router.get('/api/accounts/:team_id', (req, res) => {
  const team_id = req.params.team_id;
  models.getAccount({ team_id }, account => {
    res.send(account);
  });
});

router.get('/embed/:team_id/', (req, res) => {
  const team_id = req.params.team_id;
  const config = { team_id };
  res.send(`window.SlackChat = {teamId: '${team_id}'}; ${rawBundle}`);
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