const config = require('config');
const Course = require('../models/Course');
const User = require('../models/User');
const courseEvents = require('../events/course.events');

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
   * Stores a team in the database
   *
   * TODO: In the future, we will handle billing here
   * to get the user's card info before we make
   * calls to the twilio api
   */
  store: async (req, res, next) => {
    const { name } = req.body;
    const userId = req.session.user.id;

    // Create the team
    try {
      const team = await Team.query().insert({
        name: name,
        owner_id: req.session.user.id,
      });

      // Update the active Team for user
      await User.query().findById(userId).patch({
        activeTeamId: team.id,
      });

      // Send out team
      CourseEvents.emit('course-created', course);

      res.redirect('/home');
    } catch (err) {
      next(err);
    }
  },
};
