var express = require('express');
var router = express.Router();

router.get('/register', function(req, res) {
  res.render('users/new');
});

module.exports = router;