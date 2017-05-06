const express = require('express');
const router = express.Router();


router.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(response => {
      res.redirect('/');
    })
});

module.exports = router;