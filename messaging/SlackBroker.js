var redis = require("redis");
const axios = require('axios');
const querystring = require('querystring');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RtmClient = require('@slack/client').RtmClient;
const SLACK_API_URL = 'https://slack.com/api';
const Moniker = require('moniker');
const models = require('../models');


class SlackBroker {

  constructor() {
    this.sub = redis.createClient();
    this.pub = redis.createClient();
    this.visitors = redis.createClient();
    this.channelIds = {};
    this.sub.on("message", this.onChannelMessage.bind(this));
    this.sub.subscribe("from:chindow");

    const token = "xoxp-94105311894-94121573042-154831839681-d1443ebae07624d73dbd9a6e3d9982d0";
    this.rtm = new RtmClient(token);
    this.channelMap = {};
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onClientAuthenticated.bind(this));
    this.rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, this.onSlackMessage.bind(this));
    this.rtm.start();
  }

  onClientAuthenticated(rtmStartData) {
    rtmStartData.channels.forEach(channel => this.channelMap[channel.name] = channel.id);
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  }

  onSlackMessage(message) {
    message = JSON.parse(message);
    if (message.text && message.channel && !message.bot_id) {
      this.visitors.hget("channel_id_to_uui", message.channel, (err, visitorId) => {
        message.visitorId = visitorId;
        message = { type: "text", data: message };
        this.pub.publish("from:slack", JSON.stringify(message));
      });
    }
  }

  onChannelMessage(redisChannel, message) {
    message = JSON.parse(message);
    if (message.type === "text") {
      this.handleTextMessage(message);
    } else if (message.type === "new_visitor") {
      const channelName = Moniker.choose();
      this.createChannel(channelName, message.visitorId);
    }
  }
  
  handleTextMessage(message) {
    const slackChannelId = message.data.channelId;
    if (slackChannelId) {
      const team_id = message.data.teamId;
      models.getAccount({team_id}, account => {
         
        return axios.post(`${SLACK_API_URL}/chat.postMessage`, 
            querystring.stringify({
              token: account.access_token, 
              channel: slackChannelId,
              text: message.data.body,
              username: slackChannelId
            }))
      });
    }
  }

  createChannel(name, visitorId) {
    const token = "xoxp-94105311894-94121573042-154831839681-d1443ebae07624d73dbd9a6e3d9982d0";
    return axios.post(`${SLACK_API_URL}/channels.create`, querystring.stringify({token, name}))
        .then(response => {
          if (response.status === 200) {
            const channelId = response.data.channel.id;
            this.visitors.hset("uui_to_channel_id", visitorId, channelId, redis.print);
            this.visitors.hset("channel_id_to_uui", channelId, visitorId, redis.print);
          }
        });
  }

}

module.exports = SlackBroker;