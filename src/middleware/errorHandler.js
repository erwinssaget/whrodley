const { NotFound } = require('http-errors');
const log = require('debug')('app:ErrorHandler')

module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  if (err instanceof NotFound) {
    res.status(404);
    res.render('404');
    return;
  }

  // render the error page
  const status = err.status || 500;
  res.status(status);

  if (req.xhr) {
    return res.json(err)
  }

  res.render('500');
};
