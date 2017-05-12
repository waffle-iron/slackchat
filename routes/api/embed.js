const express = require('express');
const Account = require('./../../models/Account');
const router = express.Router();
const path = require('path');
const fs = require('fs');


const rawBundle = fs.readFileSync(path.join(__dirname, '../../public', 'build', 'chindow.bundle.js'));

router.get('/:team_id/', (req, res) => {
  const team_id = req.params.team_id;
  const config = { team_id };

  Account.findOne({ team_id }).exec().then((account) => {
    if (account) {
      res.send(`window.SlackChat = {
        teamId: '${team_id}',
        teamName: '${account.team_name}',
        imageUrl: '${account.icon.image_34}'
      }; ${rawBundle}`);
    } else {
      res.sendStatus(404);
    }
  });

});

module.exports = router;