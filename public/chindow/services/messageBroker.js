import MESSAGE_TYPES from './../../../messaging/messageTypes';
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
const SOCKET_URL = process.env.SC_SOCKET_URL;
const io = require('socket.io-client');

const messageBroker = {

  init() {
    const socket = io(SOCKET_URL);
    this.socket = socket;
    this.messageRecievedHandlers = [];
    socket.on(BROKER.VISITOR_ID, this.setVisitorId);
    socket.on(BROKER.MESSAGE, this.handleIncomingMessage.bind(this));
    let visitorId = this.getVisitorId();
    let teamId = this.getTeamId();

    if (!visitorId) { socket.emit(CLIENT.NEW_VISITOR, {teamId}); }
    else { socket.emit(CLIENT.RETURNING_VISITOR, { visitorId });}
  },

  sendMessage(msg) {
    msg.visitorId = this.getVisitorId();
    msg.teamId = this.getTeamId();
    this.socket.emit(CLIENT.MESSAGE, msg);
  },

  handleIncomingMessage(msg) {
    this.messageRecievedHandlers.forEach(handle => handle(msg));
  },

  onMessageReceived(handler) {
    this.messageRecievedHandlers.push(handler);
  },

  getVisitorId() {
    return localStorage.getItem('visitorId');
  },

  getTeamId() {
    return SlackChat['teamId'];
  },

  getTeamName() {
    return SlackChat['teamName'];
  },

  getImageUrl() {
    return SlackChat['imageUrl'];
  },

  setVisitorId(data) {
    localStorage.setItem('visitorId', data.visitorId);
  }
};

export default messageBroker;