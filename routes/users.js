var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/register', function(req, res) {
  res.render('users/new');
  console.log("Hello!");
});

router.post('/register', function(req, res){
  console.log(User);
  User.register(new User({ username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      return res.render('register', { user: user });
    }

    passport.authenticate('local')(req, res, function() {
      res.redirect('/shows')
    });
  });
});

module.exports = router;