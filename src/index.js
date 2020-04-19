const pino = require('pino');
const app = require('./app');
const debug = require('debug')('app:index');
const { logger } = require('./pino');

const PORT = process.env.PORT || 3030;

const server = app.listen(PORT, () =>
  debug(`App started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    shutdown();
  })
);

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection');
    shutdown();
  })
);

// quit on ctrl-c
process.on('SIGINT', () => {
  debug(
    'Got SIGINT (aka ctrl-c). Graceful shutdown ',
    new Date().toISOString()
  );
  shutdown();
});

// quit properly when sent shutdown signal
process.on('SIGTERM', () => {
  debug('Got SIGTERM. Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// shut down server
function shutdown() {
  // NOTE: server.close is for express based apps
  server.close((err) => {
    if (err) {
      debug(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
