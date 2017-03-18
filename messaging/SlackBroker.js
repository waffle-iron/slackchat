var redis = require("redis");
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;


class SlackBroker {

  constructor() {
    this.sub = redis.createClient();
    this.pub = redis.createClient();
    this.sub.on("message", this.onChannelMessage.bind(this));
    this.sub.subscribe("from:chindow");

    const token = "xoxp-94105311894-94121573042-154831839681-d1443ebae07624d73dbd9a6e3d9982d0";
    this.rtm = new RtmClient(token);
    this.channelMap = {};
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onClientAuthenticated.bind(this));
    this.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, this.onConnectionOpened.bind(this));
    this.rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, this.onSlackMessage.bind(this));
    this.rtm.start();
  }

  onClientAuthenticated(rtmStartData) {
    rtmStartData.channels.forEach(channel => this.channelMap[channel.name] = channel.id);
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  }

  onConnectionOpened(data) {
    console.log(`Connection opened: ${data}`);
  }

  onSlackMessage(message) {
    message = JSON.parse(message);
    if (message.text) {
      this.pub.publish("from:slack", message.text);
    }
  }

  onChannelMessage(redisChannel, message) {
    console.log("SlackBroker:" + redisChannel + ": " + message);
    const slackChannelId = this.channelMap["chindow-test"];
    this.rtm.sendMessage(message, slackChannelId);
  }

  sendMessage(message, slackChannel) {
    console.log(`I'm supposed to send this: ${message}`);
  }

}

module.exports = SlackBroker;