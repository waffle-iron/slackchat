var redis = require("redis");
const SlackBroker = require('./SlackBroker');
const ChindowBroker = require('./ChindowBroker');

module.exports = (io) => {
  console.log('setting up chat system');
  const chindowBroker = new ChindowBroker(io);
  const slackBroker = new SlackBroker();
};