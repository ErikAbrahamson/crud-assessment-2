var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose-q')(require('mongoose'), {spread:true}),
  Exercise = require('../models/exercise.js');

router.get('/', function(req, res) {
  res.render('index', {title: 'CRUD 2'});
});

module.exports = router;
