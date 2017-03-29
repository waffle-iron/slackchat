var redis = require("redis");
const axios = require('axios');
const querystring = require('querystring');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RtmClient = require('@slack/client').RtmClient;
const io = require('socket.io-client');
const SLACK_API_URL = 'https://slack.com/api';
const Moniker = require('moniker');
const models = require('../models');


class SlackBroker {

  constructor({ botToken }) {
    this.sub = redis.createClient();
    this.pub = redis.createClient();
    this.visitors = redis.createClient();
    this.channelIds = {};
    this.sub.on("message", this.onChannelMessage.bind(this));
    this.sub.subscribe("from:chindow");


    this.botToken = botToken;
    this.rtm = new RtmClient(botToken);
    this.channelMap = {};
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, this.onClientAuthenticated.bind(this));
    this.rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, this.onSlackMessage.bind(this));
    this.rtm.on(CLIENT_EVENTS.RTM.UNABLE_TO_RTM_START, this.onStartErr.bind(this));
    this.rtm.start();
  }

  getWssUrl({ botToken }) {
    return axios.post(`${SLACK_API_URL}/rtm.start`, 
        querystring.stringify({ botToken }))
          .then(res => res.data)
          .catch(err => console.log(err) );
  }

  onStartErr(err) {
    console.log(err);
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
      this.createChannel(channelName, message.visitorId, message.teamId);
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

  addToChannel({ token, channelId, botId }) {
    const params = {
      token,
      channel: channelId,
      user: botId
    };
    return axios.post(`${SLACK_API_URL}/channels.invite`, querystring.stringify(params))
      .then(response => {
        if (response.status === 200) {
          return channelId;
        }
      });
  }

  createChannel(name, visitorId, team_id) {
    models.getAccount({team_id}, account => {
      if (!account) { return false; }

      const token = account.access_token;
      const botId = account.bot.bot_user_id;

      return axios.post(`${SLACK_API_URL}/channels.create`, querystring.stringify({token, name}))
          .then(response => {
            if (response.status === 200) {
              const channelId = response.data.channel.id;
              return this.addToChannel({token, channelId, botId})
            }
          }).then(channelId => {
              this.visitors.hset("uui_to_channel_id", visitorId, channelId, redis.print);
              this.visitors.hset("channel_id_to_uui", channelId, visitorId, redis.print);
          });
    });
  }

}

module.exports = SlackBroker;