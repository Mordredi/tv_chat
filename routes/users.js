var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Show = require('../models/show');
var WatchedEpisode = require('../models/watched_episode');
var router = express.Router();

router.get('/register', function(req, res) {
  res.locals.errors = req.flash();
  var errors = res.locals.errors.error;
  res.render('users/new', {errors: errors});
});

router.post('/register', function(req, res){
  User.register(new User({ username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      req.flash('error', 'Username already selected');
      res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to TV Chat!');
      res.redirect('/shows');
    });
  });
});

router.get('/login', function(req, res) {
  res.locals.errors = req.flash();
  var errors = res.locals.errors.error;
  console.log(res.locals.errors);
  res.render('../views/users/login', {errors: errors});
});

router.post('/login', passport.authenticate('local', { successRedirect: '/shows',
                                                       failureRedirect: '/login',
                                                       failureFlash: true,
                                                       successFlash: "Welcome to TV Chat!"
                                                      })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;