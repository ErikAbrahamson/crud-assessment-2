var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../server/app'),
  should = chai.should(),
  mongoose = require('mongoose');
  Exercise = require('../server/models/exercise');

chai.use(chaiHttp);

describe('Exercises', function() {
  // GET all
  it('should list ALL exercises on /api/v1/exercises GET', function(done) {
    chai.request(server)
      .get('/api/v1/exercises')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('tags');
        done();
      });
    });
  // GET single
  it('should get a single exercise on /api/v1/exercises GET', function(done) {
    var testExercise = new Exercise({
      name: 'Mocha Test',
      description: 'Mocha Description',
      tags: ['tag','another tag']
    });
    testExercise.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/exercises/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });
  // PUT single
  it('should update a single exercise', function(done) {
    chai.request(server)
      .get('/api/v1/exercises/')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/v1/exercises/' + res.body[0]._id)
          .send({'name': 'I\'ve been changed!'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.name.should.equal('I\'ve been changed!');
            done();
          });
      });
  });
  // Delete single
  it('should delete a single exercise', function(done){
    chai.request(server)
      .get('/api/v1/exercises/')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/v1/exercises/' + res.body[0]._id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
