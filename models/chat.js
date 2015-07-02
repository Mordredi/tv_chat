var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Chat = new Schema({
  episode_id: { type: String },
  messages: [{
    username: { type: String },
    message: { type: String }
  }]
});

module.exports = mongoose.model('Chat', Chat);