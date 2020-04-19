const createError = require('http-errors');

// Catch 404 and forward to error handler
module.exports = (req, res, next) => {
  next(createError(404));
};
