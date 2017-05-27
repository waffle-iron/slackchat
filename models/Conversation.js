const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  channelId: String,
  visitorId: String,
  teamId: String,
});

const Conversation = mongoose.model('Conversation', conversationSchema);
conversationSchema.plugin(timestamps);

module.exports = Conversation;
