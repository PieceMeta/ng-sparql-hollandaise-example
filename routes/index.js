var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/screens/:name', function(req, res) {
  res.render('screens/' + req.params.name);
});

module.exports = router;