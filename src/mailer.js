const nodemailer = require('nodemailer');
const config = require('config');
const debug = require('debug')('app:mailer');

let mailer = nodemailer.createTransport({
  ...config.get('mail'),
  secure: process.env.NODE_ENV === 'production', // use TLS
});

mailer.verify(function (err) {
  if (err) {
    debug(err);
    return;
  }

  debug('Mailer is ready to send emails.');
});

module.exports = mailer;
