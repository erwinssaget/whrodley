const twilio = require('twilio');
const twilioClient = require('../twilio');
const log = require('debug')('app:TwilioController');
const Message = require('../models/Message');
const MessagingResponse = twilio.twiml.MessagingResponse;
const pusher = require('../pusher');

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

  handleIncoming: async (req, res, next) => {
    const { courseId } = req.params;

    const { To, From, Body, SmsSid } = req.body;

    // Validate message comes from twilio
    // Insert Message in database
    // add user to course if not in there
    // DONE: Send a pusher event
    // PARTIALLY DONE: Send a twilio response, need to customize response if not in course
    try {
      const message = await Message.query().insert({
        body: Body,
        course_id: courseId,
        from: From,
        sms_sid: SmsSid,
        to: To,
      });

      pusher.trigger(`course-${courseId}`, 'incoming-sms', {
        message,
      });

      const twiml = new MessagingResponse();
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    } catch (err) {
      next(err);
    }
  },
};
