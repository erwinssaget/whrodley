const router = require('express').Router();

const courseController = require('../controllers/courses.controller');
const messagesController = require('../controllers/messages.controller')
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.get('/create', courseController.showCreateCoursePage);
router.get('/', courseController.index)
router.post('/', courseController.store);
router.get('/:courseId', courseController.show)
router.get('/:courseId/messages', messagesController.index)
router.post('/:courseId/messages', messagesController.store)
module.exports = router;
