const pinoDebug = require('pino-debug');
const logger = require('pino')({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.NODE_ENV !== 'production',
});
const expressPino = require('express-pino-logger');
pinoDebug(logger, {
  auto: true, // default
  map: {
    'app:*': 'info',
    'express:router': 'debug',
    '*': 'trace', // everything else - trace
  },
});

const expressLogger = expressPino({
  logger,
});

module.exports = { logger, expressLogger };
