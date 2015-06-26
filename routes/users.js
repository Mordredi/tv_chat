var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/register', function(req, res) {
  res.render('users/new');
});

router.post('/register', function(req, res){
  User.register(new User({ username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      return res.render('../views/users/register', { user: user });
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/shows')
    });
  });
});

router.get('/login', function(req, res) {
  res.render('../views/users/login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/shows', { user : req.user });
});

module.exports = router;