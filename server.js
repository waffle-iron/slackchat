const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const initMessaging = require('./messaging');
const slackAuth = require('./services/slackAuth');
const helpers = require('express-helpers')

// set the view engine to ejs
helpers(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));


initMessaging(io);


// ------------- INDEX -------------
app.get('/', (req, res) => {
  if (req.query.code) {
    slackAuth
      .getAccessToken(req.query.code)
      .then(response => {
        const token = response.data.access_token;
        res.render('setup.ejs', { token });
      })
  } else {
    res.render('index.ejs' );
  }
});

// ------------- SIGNOUT -------------
app.get('/signout', (req, res) => {
  slackAuth
    .signOut(req.query.token)
    .then(response => {
      console.log(response);
      res.redirect('/');
    })
})

// ------------- SETUP -------------
app.get('/setup', (req, res) => {
  res.render('setup.ejs');
});

server.listen(PORT, () => {
  console.log(`App listening at http://127.0.0.1:${PORT}`)
});
