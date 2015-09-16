var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose-q')(require('mongoose'), {spread:true}),
  Exercise = require('../models/exercise.js');

router.get('/exercises', function(req, res, next) {
  Exercise.findQ()
    .then(function (result) { res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

router.post('/exercises', function(req, res, next) {
  new Exercise(req.body)
    .saveQ(function(err, data) {
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
