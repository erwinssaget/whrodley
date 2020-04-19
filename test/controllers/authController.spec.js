const chai = require('chai'),
  expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const faker = require('faker');
const app = require('../../src/app');

const User = require('../../src/models/user');
const knex = require('../../src/knex');
const errors = require('../../src/error-messages');

chai.use(chaiHttp);
const uri = '/login';

describe('AuthController', function() {
  before(function(done) {
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
      .catch(done);
  });

  after(function(done) {
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  describe('POST /login', function() {
    it('requires an email', function(done) {
      chai
        .request(app)
        .post(`${uri}`)
        .send({ password: 'password' })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.include.any.keys('email');
          expect(res.body.errors).to.not.include.any.keys('password');
          expect(res.body.errors).to.include({
            email: errors.NO_EMAIL_PROVIDED,
          });
          done();
        });
    });

    it('requires a password', function(done) {
      chai
        .request(app)
        .post(`${uri}`)
        .send({ email: 'heelo@gmail.com' })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.include.keys('password');
          expect(res.body.errors).to.not.include.any.keys('email');
          expect(res.body.errors).to.include({
            password: errors.NO_PASSWORD_PROVIDED,
          });
          done();
        });
    });

    it('checks if password matches (wrong)', function(done) {
      const email = faker.internet.email();

      User.create({ name: 'Example User', email, password: 'password' }).then(
        user => {
          chai
            .request(app)
            .post(`${uri}`)
            .send({ email, password: 'password1' })
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.body.errors).to.include({
                password: errors.WRONG_PASSWORD_PROVIDED,
              });
              done();
            });
        },
      );
    });

    it('checks if password matches (right)', function(done) {
      const email = faker.internet.email();

      User.create({
        name: 'Example User',
        email,
        password: 'badpassword',
      }).then(user => {
        chai
          .request(app)
          .post(`${uri}`)
          .send({ email, password: 'badpassword' })
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.include.keys('token');
            done();
          });
      });
    });

    it('checks if users exists', function(done) {
      chai
        .request(app)
        .post(`${uri}`)
        .send({
          email: 'emailthatdoesntexist@gmail.com',
          password: 'password1',
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body.errors).to.include({ email: errors.USER_NOT_FOUND });
          done();
        });
    });
  });
});
