const crypto = require('crypto');
const redis = require("redis");
const MESSAGE_TYPES = require('./messageTypes');
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
var mainSocket;


class ChindowBroker {

  constructor(io) {
    this.sub = redis.createClient();
    this.pub = redis.createClient();
    this.sub.on("message", this.onChannelMessage.bind(this));
    this.sub.subscribe("from:slack");

    this.io = io;
    this.io.on('connection', (socket) => {
      this.socket = socket;
      this.addEventListeners(this.socket);
    });
  }

  addEventListeners(socket) {
    socket.on(CLIENT.NEW_VISITOR, ()=> this.onNewVisitor(socket));
    socket.on(CLIENT.MESSAGE, (message) => this.onChindowMessage(socket, message) );
  }

  onNewVisitor(socket) {
    const visitorId = crypto.randomBytes(48).toString('base64');
    socket.emit(BROKER.VISITOR_ID, { visitorId });
  }

  onChindowMessage(socket, message) {
    message.author = 'them';
    this.pub.publish("from:chindow", message.body);
  }

  onChannelMessage(redisChannel, message) {
    console.log("ChindowBroker:" + redisChannel + ": " + message);
    if (this.socket) {
      this.socket.emit(BROKER.MESSAGE, { author: "them", body: message });
    }
  }
}

module.exports = ChindowBroker;