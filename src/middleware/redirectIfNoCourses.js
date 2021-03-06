const createError = require('http-errors');
const User = require('../models/User');
const log = require('debug')('app:NoCoursesMiddleware');

module.exports = async (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return next(createError(401, 'Unauthorized'));
  }

  const courses = await User.relatedQuery('courses').for(user.id);

  if (courses && courses.length === 0) {
    return res.redirect('/courses/create');
  }

  next();
};
