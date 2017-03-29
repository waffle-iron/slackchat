const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const initMessaging = require('./messaging');
const slackAuth = require('./services/slackAuth');
const helpers = require('express-helpers')
const connectDb = require('./services/connections').connect;
const routes = require('./routes');
const model = require('./models');


// set the view engine to ejs
helpers(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));




app.use(routes);

connectDb().then(db => {
  if (!db) { return console.log("Database not connected"); }

  model.getBotTokens(botTokens => {
    initMessaging(io, botTokens);
    server.listen(PORT, () => {
      console.log(`App listening at http://127.0.0.1:${PORT}`)
    });
  });

});

