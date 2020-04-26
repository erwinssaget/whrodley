const expressPino = require('express-pino-logger');
const logger = require('pino')({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.NODE_ENV !== 'production',
});

const expressLogger = expressPino({
  logger,
});

module.exports = { logger, expressLogger };
