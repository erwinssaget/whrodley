const router = require('express').Router();

const courseController = require('../controllers/courses.controller');
const messagesController = require('../controllers/messages.controller');
const studentController = require('../controllers/student.controller');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.get('/create', courseController.showCreateCoursePage);
router.post('/', courseController.store);
router.get('/:courseId', courseController.show);
router.get('/:courseId/messages', messagesController.index);
router.post('/:courseId/messages', messagesController.store);
router.get('/:courseId/students', studentController.index);
module.exports = router;
