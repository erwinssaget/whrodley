const { NotFound } = require('http-errors');
const log = require('debug')('app:ErrorHandler')

module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  log(err);

  if (err instanceof NotFound) {
    res.status(404);
    res.render('404');
    return;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('500');
};
