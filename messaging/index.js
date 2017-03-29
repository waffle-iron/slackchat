var redis = require("redis");
const SlackBroker = require('./SlackBroker');
const ChindowBroker = require('./ChindowBroker');


module.exports = (io, botTokens) => {
  const chindowBroker = new ChindowBroker(io);
  const slackBrokers = botTokens.map(botToken => {
    return new SlackBroker({ botToken });
  });
};