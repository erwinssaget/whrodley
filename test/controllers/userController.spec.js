const chai = require('chai'),
  expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
var sinonChai = require('sinon-chai');
const faker = require('faker');
const app = require('../../src/app');
const knex = require('../../src/knex');
const User = require('../../src/models/user');
const Registration = require('../../src/events/registration');
const error = require('../../src/error-messages');
chai.use(chaiHttp);
chai.use(sinonChai);

describe('UserController', function () {
  before(function (done) {
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
      .catch(done);
  });

  after(function (done) {
    knex.migrate
      .rollback()
      .then(function () {
        done();
      })
      .catch((err) => {
        console.log('there was an eror');
        console.log(err);
        done();
      });
  });

  describe('POST /api/user', function () {
    it('requires a name', function (done) {
      chai
        .request(app)
        .post('/api/user')
        .send({ email: 'erwins@gmail.com', password: 'password' })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.deep.include({
            name: error.NO_NAME_PROVIDED,
          });
          done();
        });
    });

    it('requires an email', function (done) {
      chai
        .request(app)
        .post('/api/user')
        .send({ name: 'Erwins Saget', password: 'password' })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.deep.include({
            email: error.NO_EMAIL_PROVIDED,
          });
          done();
        });
    });

    it('requires a password', function (done) {
      chai
        .request(app)
        .post('/api/user')
        .send({ name: 'Erwins Saget', email: 'erwinsaget@gmail.com' })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.deep.include({
            password: error.NO_PASSWORD_PROVIDED,
          });
          done();
        });
    });

    it('does not allow registration with email already in use', async function () {
      const name = faker.name.findName();
      const email = 'emailthatistaken@gmail.com';
      const password = 'password';

      await User.create({ name: faker.name.findName(), email, password });

      chai
        .request(app)
        .post('/api/user')
        .send({ name, email, password })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(422);
          expect(res.body.errors).to.deep.include({
            email: error.EMAIL_IN_USE,
          });
        });
    });

    it('calls the registration event', function (done) {
      const spy = sinon.spy();

      Registration.on('signUp', spy);

      const name = faker.name.findName();
      const email = faker.internet.email();

      chai
        .request(app)
        .post('/api/user')
        .send({
          name,
          email,
          password: 'password',
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(spy).to.have.been.calledOnce;
          expect(spy.getCall(0).args[0]).to.have.all.keys(
            'id',
            'name',
            'email'
          );
          done();
        });
    });

    it('correctly creates a user', function (done) {
      const name = faker.name.findName();
      const email = faker.internet.email();

      chai
        .request(app)
        .post('/api/user')
        .send({
          name,
          email,
          password: 'password',
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.any.keys('password');
          done();
        });
    });
  });
});
