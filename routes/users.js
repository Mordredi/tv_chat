var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Show = require('../models/show');
var WatchedEpisode = require('../models/watched_episode');
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
  res.locals.errors = req.flash();
  var errors = res.locals.errors.error;
  res.render('../views/users/login', {errors: errors});
});

router.post('/login', passport.authenticate('local', { successRedirect: '/shows',
                                                       failureRedirect: '/login',
                                                       failureFlash: true,
                                                       successFlash: "Welcome!"
                                                      })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;