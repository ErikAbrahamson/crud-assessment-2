var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('Exercises', function() {

  it('should list ALL exercises on /api/v1/exercisess GET', function(done) {
  chai.request(server)
    .get('/api/v1/exercises')
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE exercise on /api/v1/exercises/<id> GET');
  it('should add a SINGLE exercise on /api/v1/exercisess POST');
  it('should update a SINGLE exercise on /api/v1/exercises/<id> PUT');
  it('should delete a SINGLE exercise on /api/v1/exercises/<id> DELETE');
});
