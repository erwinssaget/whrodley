const compression = require('compression');
const config = require('config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const configureLocals = require('./locals');
const configureSessions = require('./sessions');
const configureHandlebars = require('./hbs');
const notFoundMiddleware = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { expressLogger } = require('./pino');

const app = express();

configureLocals(app);
if (process.env.NODE_ENV !== 'test') {
  app.use(expressLogger);
}
app.use(cors());
app.use(helmet());
app.use(cookieParser(config.get('secret')));
app.use(compression());
app.use(express.static('public'));
configureSessions(app); // configure session middleware
configureHandlebars(app); // configure handlebars
app.use('/', require('./routes'));
app.use(notFoundMiddleware);
app.use(errorHandler);

module.exports = app;
