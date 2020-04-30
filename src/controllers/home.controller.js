const log = require('debug')('app:HomeController');
const User = require('../models/User');

module.exports = {
  showHomePage: async (req, res, next) => {
    const user = req.session.user;

    try {
      const results = await User.query().where('id', user.id).withGraphFetched('courses.students')

      const courses = results[0].courses;
      log(courses)
      res.render('home', {
        csrfToken: req.csrfToken(),
        courses,
      });
    } catch (err) {
      next(err);
    }
  },
};
