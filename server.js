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


// set the view engine to ejs
helpers(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));


initMessaging(io);

app.use(routes);

connectDb().then(db => {
  if (db) { console.log("Database connected"); }
  server.listen(PORT, () => {
    console.log(`App listening at http://127.0.0.1:${PORT}`)
  });
});

