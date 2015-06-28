var express = require('express');
var Show = require('../models/show');
var router = express.Router();

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
    res.render('shows/show', {show: show});
  });
});

module.exports = router;