const EventEmitter = require('events');
const sendRegistrationEmail = require('../listeners/sendRegistrationEmail');
const debug = require('debug')('app:registration');

const Registration = new EventEmitter();

Registration.on('signUp', sendRegistrationEmail);

Registration.on('error', function (err) {
  debug(`registration event ${err}`);
});

module.exports = Registration;
