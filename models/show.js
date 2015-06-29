var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Show = new Schema({
  name: { type: String },
  episodes: [{
    title: {type: String},
    episodeNumber: {type: Number},
    season: {type: Number}
  }]
});



module.exports = mongoose.model('Show', Show);