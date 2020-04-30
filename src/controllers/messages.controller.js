const config = require('config');
const createError = require('http-errors');
const twilio = require('twilio');
const log = require('debug')('app:MessagesController');
const Message = require('../models/Message');
const Course = require('../models/Course');
const Student = require('../models/Student')

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
    const { body, student } = req.body;

    // get the team associated with authenticated user
    const course = await Course.query().findById(courseId);
    const studentInfo = await Student.query().findById(student.id);

    try {
      const twilioResponse = await twilio(course.twilio_sid, course.twilio_auth_token).messages.create({
        body,
        from: course.phone_number,
        to: studentInfo.phone_number,
      });

      const message = await Message.query().insert({
        course_id: courseId,
        body,
        from: twilioResponse.from,
        to: twilioResponse.to,
        sms_sid: twilioResponse.SmsSid
      });

      res.json(message);
    } catch (error) {
      log(error)
      next(error);
    }
  },
};
