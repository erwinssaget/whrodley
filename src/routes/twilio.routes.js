const router = require('express').Router();

const twilioController = require('../controllers/twilio.controller')
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.post('/available-phone-numbers', twilioController.getAvailableNumbers);

module.exports = router;
