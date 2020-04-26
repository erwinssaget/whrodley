const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('Logging In', function () {
  it('GET /login', function (done) {
    chai
      .request(app)
      .get('/login')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
