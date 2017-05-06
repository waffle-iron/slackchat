const express = require('express');
const router = express.Router();
const slackAuth = require('./../services/slackAuth');


router.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(response => {
      req.session.destroy();
      res.redirect('/');
    })
});

module.exports = router;