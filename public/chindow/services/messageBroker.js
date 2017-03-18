import MESSAGE_TYPES from './../../../messaging/messageTypes';
const CLIENT = MESSAGE_TYPES.CLIENT;
const BROKER = MESSAGE_TYPES.BROKER;
const SOCKET_URL = 'http://localhost:9090';

const messageBroker = {

  init() {
    const socket = io(SOCKET_URL);
    this.socket = socket;
    this.messageRecievedHandlers = [];
    socket.on(BROKER.VISITOR_ID, this.setVisitorId);
    socket.on(BROKER.MESSAGE, this.handleIncomingMessage.bind(this));
    socket.emit(CLIENT.NEW_VISITOR);
  },

  sendMessage(msg) {
    this.socket.emit(CLIENT.MESSAGE, msg);
  },

  handleIncomingMessage(msg) {
    this.messageRecievedHandlers.forEach(h => h(msg));
  },

  onMessageReceived(handler) {
    this.messageRecievedHandlers.push(handler);
  },

  setVisitorId(data) {
    console.log(data);
  }
};

export default messageBroker;