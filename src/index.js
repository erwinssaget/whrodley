require('dotenv').config();
const pino = require('pino');
const pinoDebug = require('pino-debug');
const { logger } = require('./pino');
pinoDebug(logger, {
  auto: true, // default
  map: {
    'app:*': 'info',
    'express:router': 'debug',
    '*': 'trace', // everything else - trace
  },
});
const log = require('debug')('app:Index')

const app = require('./app');

const PORT = process.env.PORT || 3030;

const server = app.listen(PORT, () =>
  log(`App started in ${process.env.NODE_ENV} mode on port ${PORT}`)
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
  log(
    'Got SIGINT (aka ctrl-c). Graceful shutdown ',
    new Date().toISOString()
  );
  shutdown();
});

// quit properly when sent shutdown signal
process.on('SIGTERM', () => {
  log('Got SIGTERM. Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// shut down server
function shutdown() {
  // NOTE: server.close is for express based apps
  server.close((err) => {
    if (err) {
      log(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
