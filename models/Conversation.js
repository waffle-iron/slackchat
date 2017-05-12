const mongoose = require('mongoose');

const Conversation = mongoose.model('Conversation', { 
  channelId: String,
  visitorId: String
});

module.exports = Conversation;