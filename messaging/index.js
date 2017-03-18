var redis = require("redis");
const SlackBroker = require('./SlackBroker');
const ChindowBroker = require('./ChindowBroker');


module.exports = (io) => {
  const chindowBroker = new ChindowBroker(io);
  const slackBroker = new SlackBroker();
};