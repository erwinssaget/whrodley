/**
 * All the routes for your application are defined here
 */
const csrf = require('csurf'), // https://github.com/expressjs/csurf
  bodyParser = require('body-parser'), // https://github.com/expressjs/body-parser
  createError = require('http-errors'),
  router = require('express').Router(),
  { showLandingPage } = require('./controllers/pages.controller'),
  { showHomePage } = require('./controllers/home.controller'),
  { getHealth } = require('./controllers/health.controller'),
  validate = require('./requests/validate'),
  teamsController = require('./controllers/teams.controller'),
  User = require('./models/User'),
  { login, logout, showLoginPage, showRegisterPage, register, } = require('./controllers/auth.controller'); // prettier-ignore
const messagesController = require('./controllers/messages.controller');

const requireAuthenticatedUser = require('./middleware/requireAuthenticatedUser');
const redirectIfNoTeam = require('./middleware/redirectIfNoTeam');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
const getTeamInfo = require('./middleware/getTeamInfo');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/********************************************
 * Publicly accessible routes
 */
router.get('/_healthcheck', getHealth);
router.post('/messages/twilio_callback', messagesController.twilio_callback);

router.use(csrf({ cookie: true })); //csrf protection

/********************************************
 * Routes that don't require authentication
 */
router.get('/', showLandingPage);
router.get('/login', [redirectIfAuthenticated], showLoginPage);
router.post('/login', [redirectIfAuthenticated, ...validate('login')], login);
router.get('/register', [redirectIfAuthenticated], showRegisterPage);
router.post(
  '/register',
  [redirectIfAuthenticated, ...validate('register')],
  register
);

/********************************************
 * Routes that require authentication go here
 */
router.use(requireAuthenticatedUser);

router.get('/teams/create', teamsController.create);
router.post('/teams', teamsController.store);
router.use('/teams/:teamId', getTeamInfo);

router.get('/logout', logout);

router.get('/home', [redirectIfNoTeam], showHomePage);

router.get('/messages', messagesController.index);
router.post('/messages', messagesController.store);

module.exports = router;
