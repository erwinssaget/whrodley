const router = require('express').Router();

const { showHomePage } = require('../controllers/home.controller');
const redirectIfNoCourses = require('../middleware/redirectIfNoCourses');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);
router.use(redirectIfNoCourses);

router.get('/', showHomePage);

module.exports = router;
