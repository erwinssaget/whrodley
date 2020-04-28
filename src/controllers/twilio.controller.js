const twilio = require('twilio');
const twilioClient = require('../twilio');
const log = require('debug')('app:TwilioController');
const Message = require('../models/Message');
const MessagingResponse = twilio.twiml.MessagingResponse;

module.exports = {
  getAvailableNumbers: async (req, res, next) => {
    const { areaCode } = req.body;

    try {
      const localNumbers = await twilioClient
        .availablePhoneNumbers('US')
        .local.list({
          // inRegion: "AR", // in future may want to account for state?
          areaCode: areaCode || 470,
          smsEnabled: true,
          excludeAllAddressRequired: true,
          limit: 7,
        });

      res.json(localNumbers);
    } catch (err) {
      next(err);
    }
  },

  handleIncoming: (req, res, next) => {
    const incomingData = req.body;

    // Validate message comes from twilio
    // Insert Message in database
    // add user to course if not in there
    // Send a pusher event
    // Send a twilio response
    try {
      //   Message.query().insert({
      //     to: incomingData.To,
      //     from: incomingData.From,
      //     body: incomingData.Body,
      //   });
    } catch (err) {
      //
    }
    const twiml = new MessagingResponse();
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  },
};
