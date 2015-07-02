var express = require('express');
var Show = require('../models/show');
var User = require('../models/user');
var Chat = require('../models/chat');
var WatchedEpisode = require('../models/watched_episode');
var router = express.Router();

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

router.get('/shows', function(req, res){
  Show.find(function(err, shows){
    res.render('shows/index', {shows: shows})
  });
});

router.get('/shows/new', function(req, res){
  res.render('shows/new');
});

router.post('/shows/new', function(req, res){
  var show = new Show({name: req.body.name});
  show.save(function(err, show){
    if (err) {
      res.render('shows/new');
    }
    res.redirect('/shows/' + show._id);
  });
});

router.get('/shows/:id', function(req, res){
  Show.findOne({'_id': req.params.id}, function(err, show){
    var episodes = show.episodes;
    episodes = episodes.sort(function(a, b){
      return a.episodeNumber - b.episodeNumber;
    }).sort(function(a, b){
      return a.season - b.season;
    });
    WatchedEpisode.find({ user_id: req.user._id}, function(err, watched_episodes){
      var watched_episodes = watched_episodes;
      for (var i = 0; i < watched_episodes.length; i++) {
        for(var j = 0; j < episodes.length; j++){
          if (watched_episodes[i].episode_id == episodes[j]._id) {
            episodes[j].watched = true;
          }
        }
      }
      res.render('shows/show', {show: show, episodes: episodes});
    });
  });
});

router.post('/shows/:id', function(req, res){
  var id = req.params.id;
  Show.findByIdAndUpdate(id, { $push: { episodes: {title: req.body.title, season: req.body.season, episodeNumber: req.body.episodeNumber}}}, { new: true }, function(err, show){
    if (err) {
      console.log("Error");
      res.render('/shows/' + id)
    }
    var episodes = show.episodes;
    var episode = episodes[episodes.length - 1];
    var episode_id = episode._id;
    var chat = new Chat({ episode_id: episode_id });
    chat.save(function(err, chat){
      if (err) {
        res.render('shows/' + id);
      }
      res.redirect('/shows/' + id);
    });
  });
});


router.post('/shows/:show_id/:episode_id', function(req, res){
  var user = req.user;
  var show = req.params.show_id;
  var id = user._id;
  var episode = req.params.episode_id;
  var watched_episode = new WatchedEpisode({ user_id: id, episode_id: episode });
  watched_episode.save(function(err, watched_episode){
    if (err) {
      console.log('error');
      res.render('shows/' + show);
    }
    console.log('Saved');
  })
});

router.get('/shows/:episode_id/chat', function(req, res){
  var episode_id = req.params.episode_id;
  var episodes;
  var episode;
  var messages;
  Chat.findOne({episode_id: episode_id}, function(err, chat){
    Show.findOne({ 'episodes': {$elemMatch: {_id: episode_id} } }, function(err, show){
      episodes = show.episodes;
      for(var i = 0; i < episodes.length; i++){
        if (episodes[i]._id == episode_id) {
          episode = episodes[i];
        }
      }
      messages = chat.messages;
      res.render('shows/chat', {chat: chat, show: show, episode: episode, messages: messages})
    });
  });
});

router.post('/shows/:episode_id/chat/:chat_id', function(req, res){
  var username = req.user.username;
  var chat = req.params.chat_id;
  var message = req.body.message;
  console.log(message);
  Chat.findByIdAndUpdate(chat, { $push: { messages: { username: username, message: message }}}, function(err, chat){
    if (err) {
      console.log('error');
    }
    console.log('success');
  });
});

module.exports = router;