const config = require('config');
const redisClient = require('./redis');
const session = require('express-session');

const RedisStore = require('connect-redis')(session);

module.exports = (app) => {
  app.use(
    session({
      secret: config.get('secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: app.locals.inProduction,
        httpOnly: app.locals.inProduction,
        sameSite: true,
      },
      store: new RedisStore({ client: redisClient }),
    })
  );
  return app;
};
