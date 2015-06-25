var express = require('express');
var router = express.Router();

router.get('/shows', function(req, res){
  res.render('shows/index');
})

module.exports = router;