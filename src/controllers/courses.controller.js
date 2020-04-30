const twilio = require('twilio');
const config = require('config');
const CourseEvents = require('../events/course.events');
const Course = require('../models/Course');
const User = require('../models/User');
const rootTwilioClient = require('../twilio');
const log = require('debug')('app:CourseController');

module.exports = {
  /**
   * Show the team create page
   */
  showCreateCoursePage: (req, res) => {
    res.render('courses/create', {
      csrfToken: req.csrfToken(),
    });
  },

  /**
   * Stores a course
   */
  store: async (req, res, next) => {
    // we need to add middleware to validate input
    const { name, phone_number } = req.body;

    const userId = req.session.user.id;

    try {
      // subaccount will have an auth_token returned and a sid
      const subAccount = await rootTwilioClient.api.accounts.create({
        friendlyName: name,
      });

      const course = await User.relatedQuery('courses').for(userId).insert({
        name: name,
        owner_id: userId,
        role: 'instructor',
        twilio_sid: subAccount.sid,
        twilio_auth_token: subAccount.authToken,
      });

      // purchase a phone number
      const baseUrl = config.get('host');
      const courseTwilioClient = new twilio(
        course.twilio_sid,
        course.twilio_auth_token
      );
      const twilioPhoneNumber = await courseTwilioClient.incomingPhoneNumbers.create(
        {
          phoneNumber: phone_number,
          // need to add sms_url which is the url we call when phone_number receives
          // an incoming message. Thinking something like /courses/:courseId/messages
          smsUrl: `${baseUrl}/twilio/${course.id}/sms/incoming`,
        }
      );

      // after getting phoneNumber need to patch course
      const result = await course.$query().findById(course.id).patch({
        phone_number: twilioPhoneNumber.phoneNumber,
        friendly_phone_number: twilioPhoneNumber.friendlyName,
      });

      log(result);

      res.redirect('/home');
    } catch (err) {
      next(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const course = await Course.query().findById(req.params.courseId);

      delete course.twilio_sid;
      delete course.twilio_auth_token;

      res.render('courses/show', {
        course,
        csrfToken: req.csrfToken(),
      });
    } catch (err) {
      next(err);
    }
  },
};
