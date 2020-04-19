const config = require('config');

module.exports = (app) => {
  app.locals.title = config.get('title');
  app.locals.appName = config.get('appName');
  app.locals.inProduction = app.get('env') === 'production';

  return app;
};
