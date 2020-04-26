const router = require('express').Router();
const csrf = require('csurf'); // https://github.com/expressjs/csurf
const bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser

const loginRoutes = require('./login.routes');
const registrationRoutes = require('./registration.routes');
const homeRoutes = require('./home.routes');
const courseRoutes = require('./course.routes');
const twilioRoutes = require('./twilio.routes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(csrf({ cookie: true }));
router.use('/', loginRoutes);
router.use('/register', registrationRoutes);
router.use('/home', homeRoutes);
router.use('/courses', courseRoutes);
router.use('/twilio', twilioRoutes);

module.exports = router;
