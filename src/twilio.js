/**
 * This module exports the instance of twilio that contains the
 * root account credentials. This instance of twilio should only
 * be used to create subaccounts and querying information for those
 * subaccounts. For all other queries/actions, create another instance
 * of twilio with the subaccounts credentials.
 */

const twilio = require('twilio');
const config = require('config');

const accountSid = config.get('twilio.accountSid');
const authToken = config.get('twilio.authToken');

module.exports = new twilio(accountSid, authToken, {
  lazyLoading: true,
});
