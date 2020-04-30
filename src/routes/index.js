const router = require('express').Router();
const bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
const csrf = require('csurf');

const loginRoutes = require('./login.routes');
const registrationRoutes = require('./registration.routes');
const homeRoutes = require('./home.routes');
const courseRoutes = require('./course.routes');
const studentRoutes = require('./student.routes');
const twilioRoutes = require('./twilio.routes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// don't apply csrf middleware to this route
router.use('/twilio', twilioRoutes);

router.use(csrf({ cookie: true }));

router.use('/', loginRoutes);
router.use('/courses', courseRoutes);
router.use('/home', homeRoutes);
router.use('/register', registrationRoutes);
router.use('/students', studentRoutes);

module.exports = router;
