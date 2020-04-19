const CourseEvents = require('../events/course.events');
const Course = require('../models/Course');
const User = require('../models/User');
const log = require('debug')('app:CourseController');

module.exports = {
  index: (req, res) => {
    res.render('courses/index', {
      csrfToken: req.csrfToken(),
    });
  },

  /**
   * Show the team create page
   */
  showCreateCoursePage: (req, res) => {
    res.render('courses/create', {
      csrfToken: req.csrfToken(),
    });
  },

  /**
   * Stores a team in the database
   */
  store: async (req, res, next) => {
    console.log('im here');
    const { name } = req.body;
    const userId = req.session.user.id;

    // Create the team
    try {
      const course = await User.relatedQuery('courses').for(userId).insert({
        name: name,
        owner_id: userId,
        role: 'instructor',
      });

      console.log('im here');
      debug(course);

      // Send out team
      // CourseEvents.emit('course-created', course);

      // res.send('here');
      // res.redirect('/home');
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
