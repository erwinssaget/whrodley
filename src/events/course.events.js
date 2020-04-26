const EventEmitter = require('events');
const twilioClient = require('../twilio');

const CourseEvents = new EventEmitter();

const setUpTwilioSubAccount = async function (course) {
  const subAccount = await twilioClient.api.accounts.create({
    friendlyName: course.name,
    // callbackUrl: config.get()
  });
};

// CourseEvents.on('course-created', setUpTwilioSubAccount);

module.exports = CourseEvents;
