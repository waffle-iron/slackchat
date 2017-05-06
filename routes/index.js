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

module.exports = router;