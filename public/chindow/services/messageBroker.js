import MESSAGE_TYPES from './../../../messaging/messageTypes';
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
// const SOCKET_URL = 'http://localhost:9090';
const SOCKET_URL = 'http://138.197.149.23:9090';

const messageBroker = {

  init() {
    const socket = io(SOCKET_URL);
    this.socket = socket;
    this.messageRecievedHandlers = [];
    socket.on(BROKER.VISITOR_ID, this.setVisitorId);
    socket.on(BROKER.MESSAGE, this.handleIncomingMessage.bind(this));
    let visitorId = this.getVisitorId();

    if (!visitorId) { socket.emit(CLIENT.NEW_VISITOR); }
    else { socket.emit(CLIENT.RETURNING_VISITOR, { visitorId });}
  },

  sendMessage(msg) {
    msg.visitorId = this.getVisitorId();
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

  setVisitorId(data) {
    localStorage.setItem('visitorId', data.visitorId);
  }
};

export default messageBroker;