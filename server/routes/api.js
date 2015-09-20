var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose-q')(require('mongoose'), {spread:true}),
  Exercise = require('../models/exercise.js');

// HTTP get all request
router.get('/exercises', function(req, res, next) {
  Exercise.findQ()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.send(err);
    })
    .done();
});
// HTTP get single request
router.get('/exercises/:id', function(req, res, next) {
  var query = {'_id': req.params.id};
  Exercise.findByIdQ(query)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.send(err);
    })
    .done();
});
// HTTP post one request
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
// HTTP put single request
router.put('/exercises/:id', function(req, res, next) {
  var query = {'_id': req.params.id}, options = {new: true};
  Exercise.findOneAndUpdateQ(query, req.body, options)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.send(err);
    })
    .done();
});
//HTTP delete single request
router.delete('/exercises/:id', function(req, res, next) {
  Exercise.findByIdAndRemoveQ(req.params.id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    })
    .done();
});

// Angular Application loading single view file
router.get('*', function(req, res) {
  res.sendfile('../client/public/index.html');
});

module.exports = router;
