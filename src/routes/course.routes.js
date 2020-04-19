const router = require('express').Router();

const { showCreateCoursePage } = require('../controllers/courses.controller');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.get('/create', showCreateCoursePage);

module.exports = router;
