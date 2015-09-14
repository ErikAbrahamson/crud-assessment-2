var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var exercise = mongoose.model('exercises');

// SPA Render
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRUD Assessment' });
});

// API Form Post
router.post('/exercises', function(req, res, next) {
  new exercise(req.body).save(function(err, success) {
    res.render('index', { title: 'CRUD Assessment'});
  });
});

// API Get Collection
router.get('/exercises', function(req, res, next) {
  exercise.find(function(err, exercises) {
    res.json(exercises);
  });
});

// API Get Single exercise
router.get('/exercises/:id', function(req, res, next) {
  var query = {'_id': {'$oid': req.params.id}};
  exercise.findOne(query, function(err, dog) {
    res.json(dog);
  });
});

// API Put/edit Single exercise
router.put('/exercises/:id', function(req, res, next) {
  var query = {'_id':req.params.id},
    update = req.body, options = {new: true};
    exercise.findOneAndUpdate(query, update, options, function(err, dog) {
      res.json(dog);
    }
  );
});

// API Delete Single exercise
router.delete('/exercises/:id', function(req, res) {
  var query = {'_id': {'$oid': req.params.id}};
  exercise.findOneAndRemove(query, function(err, dog) {
    res.json(dog);
  });
});

module.exports = router;
