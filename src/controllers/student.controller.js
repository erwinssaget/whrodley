const log = require('debug')('app:StudentController');
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
    log(req.body)
    const { name, number, courseId } = req.body;

    try {
      log('check here')
      log(courseId)
      const course = await Course.query().findById(courseId).withGraphFetched('owner');
      log(course)
      const { phoneNumber, nationalFormat } = await twilioClient.lookups.phoneNumbers(number).fetch({ countryCode: 'US' });

      const student = await Course.relatedQuery('students').for(courseId).insert({
        name,
        phone_number: phoneNumber,
        friendly_phone_number: nationalFormat
      })
      log('student')
      log(student)

      const twilioResponse = await twilio(course.twilio_sid, course.twilio_auth_token).messages.create({
        body: `You have been added to the ${course.name} by ${course.owner.first_name}.`,
        from: course.phone_number,
        to: student.phone_number,
      })

      res.json(student);
    } catch (err) {
      next(err)
    }
  },
};
