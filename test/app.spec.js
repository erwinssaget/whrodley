const chai = require('chai'),
  expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

describe('App', function () {
  describe('GET /', function () {
    it('returns the right status code', function (done) {
      chai
        .request(app)
        .get('/_healthcheck')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
