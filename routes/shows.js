var express = require('express');
var Show = require('../models/show');
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
    console.log(show.name);
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
    res.render('shows/show', {show: show, episodes: episodes});
  });
});

router.post('/shows/:id', function(req, res){
  var id = req.params.id;
  Show.findByIdAndUpdate(id, { $push: { episodes: {title: req.body.title, season: req.body.season, episodeNumber: req.body.episodeNumber}}}, function(err, show){
    res.redirect('/shows/' + id);
  });
});

router.post('/shows/:show_id/:episode_id', function(req, res){
  var id = req.user._id;
  User.findByIdAndUpdate(id, { $push: { episodes: req.params.episode_id }}, function(err, show){
    res.redirect('/shows/' + req.params.show_id);
  });
});

module.exports = router;