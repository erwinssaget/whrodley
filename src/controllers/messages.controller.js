const config = require('config');
const createError = require('http-errors');
const Message = require('../models/Message');
const twilio = require('twilio');
const Course = require('../models/Course');
const log = require('debug')('app:MessagesController');

module.exports = {
  index: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.query().findById(courseId);

      if (req.xhr) {
        const messages = await course
          .$relatedQuery('messages')
          .where('course_id', course.id);

        log(messages);

        return res.json(messages);
      }

      res.render('messages/index', {
        course,
        csrfToken: req.csrfToken(),
      });
    } catch (err) {
      next(err);
    }
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
        from: course.phone_number,
        to: '+14705297124',
      });

      log(twilioResponse);

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

  handleIncoming: (req, res, next) => {
    log(req.body);
  },
};
