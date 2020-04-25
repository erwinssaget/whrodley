const debug = require('debug')('app:messages-controller');
const config = require('config');
const createError = require('http-errors');
const Message = require('../models/Message');
const twilio = require('twilio');
const Course = require('../models/Course');

module.exports = {
  index: async (req, res, next) => {
    if (req.xhr) {
      const courseId = req.params.courseId;

      const course = await Course.query().findById(courseId);

      const messages = await course
        .$relatedQuery('messages')
        .where('team_id', team.id);

      console.log(messages);

      res.json(messages);
      return;
    }

    res.render('messages/index', {
      csrfToken: req.csrfToken(),
    });
  },

  store: async (req, res, next) => {
    const courseId = req.params.courseId;

    // get the team associated with authenticated user
    const course = await Course.query().findById(courseId);

    const twilioClient = twilio(course.twilio_sid, course.twilio_auth_token);

    const { body } = req.body;

    try {
      const twilioResponse = await twilioClient.messages.create({
        body,
        from: course.phone_number, //'+14048825335',
        to: '+14705297124',
      });

      debug(twilioResponse);

      const message = await Message.query().insert({
        // account_sid: twilioResponse.accountSid,
        team_id: team.id,
        body,
        from: twilioResponse.from,
        to: twilioResponse.to,
        // TODO: add status callback
      });

      res.json(message);
    } catch (error) {
      req.log.error(error);
      next(error);
    }
  },
};
