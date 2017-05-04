const crypto = require('crypto');
const redis = require("redis");
const MESSAGE_TYPES = require('./messageTypes');
const models = require('../models');
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
var mainSocket;


class ChindowBroker {

  constructor(io) {
    this.sub = redis.createClient();
    this.pub = redis.createClient();
    this.visitors = redis.createClient();
    this.sockets = {};
    this.sub.on("message", this.onChannelMessage.bind(this));
    this.sub.subscribe("from:slack");

    this.io = io;
    this.io.on('connection', (socket) => {
      this.socket = socket;
      this.addEventListeners(this.socket);
    });
  }

  addEventListeners(socket) {
    socket.on(CLIENT.RETURNING_VISITOR, (message) => this.onReturningVisitor(socket, message));
    socket.on(CLIENT.NEW_VISITOR, (message) => this.onNewVisitor(socket, message));
    socket.on(CLIENT.MESSAGE, (message) => this.onChindowMessage(socket, message) );
  }

  onReturningVisitor(socket, message) {
    if (message.visitorId) {
      this.sockets[message.visitorId] = socket;
    }
  }

  onNewVisitor(socket, { teamId }) {
    const visitorId = crypto.randomBytes(48).toString('base64');
    socket.emit(BROKER.VISITOR_ID, { visitorId });

    const message = { type: "new_visitor", visitorId, teamId };
    this.pub.publish("from:chindow", JSON.stringify(message));
    this.sockets[visitorId] = socket;
    models.incrementVisitorCount(teamId);
  }

  onChindowMessage(socket, message) {
    message.author = 'them';
    if (message.visitorId) {
      this.visitors.hget("uui_to_channel_id", message.visitorId, (err, channelId) => {
        message.channelId = channelId;
        message = { type: "text", data: message };
        this.pub.publish("from:chindow", JSON.stringify(message));
      });
    }
  }

  onChannelMessage(redisChannel, message) {
    message = JSON.parse(message);
    if (message.data && message.data.visitorId) {
      let socket = this.sockets[message.data.visitorId];
      if (socket) {
        socket.emit(BROKER.MESSAGE, { author: "them", body: message.data.text });
      }
    }
  }
}

module.exports = ChindowBroker;