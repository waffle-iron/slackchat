const express = require('express');
const router = express.Router();
const models = require('./../models');
const slackAuth = require('./../services/slackAuth');


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


router.get('/accounts', (req, res) => {
  models.getAccounts(accounts => {
    res.send(accounts);
  });
});


// ------------- SIGNOUT -------------
router.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(response => {
      console.log(response.data);
      res.redirect('/');
    })
})

// ------------- SETUP -------------
router.get('/setup', (req, res) => {
  res.render('setup.ejs');
});

module.exports = router;