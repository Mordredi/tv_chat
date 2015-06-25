var express = require('express');
var router = express.Router();

router.get('/users/new', function(req, res) {
  res.render('users/new');
});

module.exports = router;