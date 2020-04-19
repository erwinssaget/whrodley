const router = require('express').Router();

const courseController = require('../controllers/courses.controller');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.get('/create', courseController.showCreateCoursePage);
router.post('/', courseController.store);

module.exports = router;
