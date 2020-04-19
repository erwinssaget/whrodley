const EventEmitter = require('events');
const twilioClient = require('../twilio');
const Course = require('../models/Course');

const CourseEvents = new EventEmitter();

const setUpTwilioSubAccount = async function (course) {
  const subAccount = await twilioClient.api.accounts.create({
    friendlyName: course.name,
    // callbackUrl: config.get()
  });

  console.log(subAccount);

  //Update team after call is made
};

CourseEvents.on('course-created', setUpTwilioSubAccount);

module.exports = CourseEvents;
