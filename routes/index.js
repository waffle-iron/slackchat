const express = require('express');
const router = express.Router();
const axios = require('axios');
const models = require('./../models');
const slackAuth = require('./../services/slackAuth');
const querystring = require('querystring');
const SLACK_API_URL = 'https://slack.com/api';
const dasboardController = require('./dashboard');
const apiController = require('./api');
const authController = require('./auth');


router.use('/', dasboardController);
router.use('/api', apiController);
router.use('/auth', authController);


router.get('/', (req, res) => {

  if (req.session.teamId) {
    res.redirect(`/${req.session.teamId}/dashboard/analytics`);
  } else if (req.query.code) {
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
                const teamId = response.data.team_id || response.data.team.id;
                req.session.teamId = teamId;
                req.session.save(() => {
                  res.redirect(`/${teamId}/dashboard/analytics`);
                });
              });
            });
        }
      });
  } else {
    res.render('index.ejs' );
  }
});

module.exports = router;