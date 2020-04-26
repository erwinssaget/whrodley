const config = require('config');
const redisClient = require('./redis');
const session = require('express-session');
const MemoryStore = session.MemoryStore;
const RedisStore = require('connect-redis')(session);

const IN_TESTING = process.env.NODE_ENV === 'test';

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
      store: IN_TESTING
        ? new MemoryStore()
        : new RedisStore({ client: redisClient }),
    })
  );
  return app;
};
