require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const initMessaging = require('./messaging');
const helpers = require('express-helpers');
const connectDb = require('./services/connections').connect;
const routes = require('./routes');
const Account = require('./models/Account');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const winston = require('winston');


app.use(session({
  store: new RedisStore({
    client: redis.createClient(),
  }),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  genid() {
    return crypto.randomBytes(48).toString('base64');
  },
}));


// set the view engine to ejs
helpers(app);
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(`${__dirname}/public`));
app.use(routes);

connectDb().then(() => {
  Account.find().distinct('bot.bot_access_token').exec().then((botTokens) => {
    initMessaging(io, botTokens);
    server.listen(PORT, () => {
      winston.info(`App listening at http://127.0.0.1:${PORT}`);
    });
  });
}, (err) => {
  if (err) {
    winston.error('Database not connected');
  }
});
