const expect = require('chai').expect;

const Registration = require('../../src/events/registration');

describe('Registration Event', function() {
  it('signUp event must be called with a user as an argument', function() {
    expect(function() {
      Registration.emit('signUp');
    }).to.throw('No user was provided.');
  });
});
