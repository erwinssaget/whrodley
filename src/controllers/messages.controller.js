const config = require('config');
const createError = require('http-errors');
const Message = require('../models/Message');
const twilio = require('twilio');
const Course = require('../models/Course');
const log = require('debug')('app:MessagesController');

module.exports = {
  index: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const course = await Course.query().findById(courseId);

      const messages = await course
        .$relatedQuery('messages')
        .where('course_id', course.id);

      return res.json(messages);
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

      console.log(`


      `);
      log(twilioResponse);

      const message = await Message.query().insert({
        course_id: courseId,
        body,
        from: twilioResponse.from,
        to: twilioResponse.to,
      });

      res.json(message);
    } catch (error) {
      req.log.error(error);
      next(error);
    }
  },
};
