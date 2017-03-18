const MESSAGE_TYPES = {
  CLIENT: {
    NEW_VISITOR: 'client.new_visitor',
    MESSAGE: 'client.message'
  },
  BROKER: {
    VISITOR_ID: 'broker.visitor_id',
    MESSAGE: 'broker.message'
  }
};

module.exports = MESSAGE_TYPES;