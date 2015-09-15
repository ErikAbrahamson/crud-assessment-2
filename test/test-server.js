process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/app');
var Exercise = require("../server/database");

var should = chai.should();
chai.use(chaiHttp);

describe('Exercises', function() {

  Exercise.collection.drop();

  beforeEach(function(done) {
    var newExercise = new Exercise({
      name: 'Chess',
      description: 'A Chess Puzzle',
      tags: ['Angular']
    });
    newExercise.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Exercise.collection.drop();
    done();
  });

  it('should list ALL blobs on /api/v1/exercises GET', function(done) {
  chai.request(server)
    .get('/api/v1/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].name.should.equal('Chess');
      res.body[0].description.should.equal('A Chess Puzzle');
      done();
    });
  });
});
