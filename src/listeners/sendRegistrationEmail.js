const mailer = require('../mailer.js');
const { NO_USER_PROVIDED } = require('../errorMessages');
const debug = require('debug')('app:registrationEmail');

module.exports = async function (user) {
  if (!user) {
    throw new Error(NO_USER_PROVIDED);
  }

  const email = {
    from: 'sender@whrodley.com',
    to: user.email,
    subject: 'Thanks for signing up',
    text: 'Thanks for signing up',
    html: '<p>Thanks for signing up</p>',
  };

  try {
    await mailer.sendMail(email);
    debug('Email was sent');
  } catch (err) {
    debug('Email was not sent');
    debug(err);
  }
};
