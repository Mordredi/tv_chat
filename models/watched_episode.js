var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WatchedEpisode = new Schema({
  user_id: { type: String },
  episode_id: { type: String }
});

module.exports = mongoose.model('WatchedEpisode', WatchedEpisode);