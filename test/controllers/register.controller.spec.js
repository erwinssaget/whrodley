const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const faker = require('faker');
const { extractCsrfToken, cookies } = require('../testUtils');

chai.use(chaiHttp);

describe('Registration', function () {
  it('GET /register', function (done) {
    chai
      .request(app)
      .get('/register')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  describe('POST /register', function () {
    const agent = chai.request.agent(app);

    it('allows a user to sign up for a new account', function (done) {
      agent.get('/register').then(function (res) {
        expect(res).to.have.cookie('_csrf');

        agent
          .post('/register')
          .type('form')
          .set('Cookie', cookies(res))
          .send({
            _csrf: extractCsrfToken(res),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'password',
            passwordConfirmation: 'password',
          })
          .end(function (err, res) {
            if (err) return done(err);
            expect(err).to.be.null;
            expect(res).to.be.html;
            expect(res).to.redirect;
            expect(res).to.redirectTo(/(\/courses\/create)$/);
            done();
          });
      });
    });
  });
});
