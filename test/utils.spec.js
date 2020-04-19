const expect = require('chai').expect;
const utils = require('../src/utils');
var argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

describe('Utility Functions', function () {
  describe('hashPassword', function () {
    it('throws if no value is provided', function () {
      expect(utils.hashPassword).to.throw;
    });

    it('correctly hashes a password', async function () {
      let password = 'randompassword';

      let hashedPassword = await utils.hashPassword(password);

      expect(hashedPassword).to.not.eql(password);
      expect(hashedPassword).to.be.a('string');
    });
  });

  describe('checksPassword', function () {
    it('correctly verifies a password', async function () {
      let str = 'arandomstring123';
      let hash;

      try {
        salt = crypto.randomBytes(16);
      } catch (err) {
        expect(err).to.not.exist;
      }

      try {
        hash = await argon2i.hash(str, salt);
      } catch (err) {
        expect(err).to.not.exist;
      }

      let correct = await utils.checkPassword(hash, str);

      expect(correct).to.be.true;
    });

    it('correctly verifies an incorrect password', async function () {
      let str = 'arandomstring123';
      let hash;

      try {
        salt = crypto.randomBytes(16);
      } catch (err) {
        expect(err).to.not.exist;
      }

      try {
        hash = await argon2i.hash(str, salt);
      } catch (err) {
        expect(err).to.not.exist;
      }

      let correct = await utils.checkPassword(hash, 'anotherpassword123');

      expect(correct).to.be.false;
    });
  });
});
