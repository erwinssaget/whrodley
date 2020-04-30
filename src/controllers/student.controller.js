const log = require('debug')('app:StudentController');
const createError = require('http-errors');
const twilio = require('twilio');
const Course = require('../models/Course');
const twilioClient = require('../twilio');

module.exports = {
  index: async (req, res, next) => {
    const { courseId } = req.params;

    try {
      const students = await Course.relatedQuery('students').for(courseId);

      res.json(students);
    } catch (err) {
      next(err)
    }
  },

  store: async (req, res, next) => {
    const { name, number, courseId } = req.body;

    try {
      const { phoneNumber, nationalFormat } = await twilioClient.lookups.phoneNumbers(number).fetch({ countryCode: 'US' });

      const result = await Course.relatedQuery('students').for(courseId).where('phone_number', phoneNumber);

      if (result[0]) {
        return next(createError(400, 'A user with that phone number is already in this class.'));
      }

      const course = await Course.query().findById(courseId).withGraphFetched('owner');

      const student = await Course.relatedQuery('students').for(courseId).insert({
        name,
        phone_number: phoneNumber,
        friendly_phone_number: nationalFormat
      })

      await twilio(course.twilio_sid, course.twilio_auth_token).messages.create({
        body: `You have been added to the ${course.name} by ${course.owner.first_name} ${course.owner.last_name}.`,
        from: course.phone_number,
        to: student.phone_number,
      })

      res.json(student);
    } catch (err) {
      next(err)
    }
  },
};
