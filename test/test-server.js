var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../server/app'),
  should = chai.should(),
  Exercise = require('../server/models/exercise');

chai.use(chaiHttp);

describe('Exercises', function() {

  it('should list ALL exercises on /api/v1/exercises GET', function(done) {
    chai.request(server)
      .get('/api/v1/exercises')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  it('should get a single exercise on /api/v1/exercises GET', function(done) {
    var testExercise = new Exercise({
      name: 'Mocha Test',
      description: 'Mocha Description',
      tags: 'tag'
    });
    testExercise.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/exercises/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('name');
          done();
        });
    });
  });
});
