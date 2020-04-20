const User = require('../models/User');

module.exports = {
  showHomePage: async (req, res, next) => {
    const user = req.session.user;

    try {
      const courses = await User.relatedQuery('courses').for(user.id);

      res.render('home', {
        csrfToken: req.csrfToken(),
        courses,
      });
    } catch (err) {
      next(err);
    }
  },
};
