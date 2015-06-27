var express = require('express');
var Show = require('../models/show');
var router = express.Router();

router.get('/shows', function(req, res){
  res.render('shows/index');
});

router.get('/shows/new', function(req, res){
  res.render('shows/new');
});

router.post('/shows/new', function(req, res){
  var show = new Show({name: req.body.name});
  show.save(function(err, show){
    var name = req.body.name;
    console.log(show.name);
    if (err) res.render('shows/new');
    res.redirect('/shows/' + name);
  });
});

router.route('shows/:name')
  .all(function(req, res, next){
    var name = req.params.name;
    var show = Show.find({name: name});
  })
  .get(function(req, res){
    res.render('shows/show')
  })

module.exports = router;