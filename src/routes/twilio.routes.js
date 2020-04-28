const router = require('express').Router();
const twilio = require('twilio');

const twilioController = require('../controllers/twilio.controller');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');
const shouldValidate = process.env.NODE_ENV !== 'test';

console.log(process.env.TWILIO_AUTH_TOKEN);

router.post(
  '/:courseId/sms/incoming',
  // twilio.webhook({ validate: shouldValidate }), // TODO: check on validating with root account auth token
  twilioController.handleIncoming
);

router.post(
  '/available-phone-numbers',
  requireAuthenticatedUser,
  twilioController.getAvailableNumbers
);

module.exports = router;
