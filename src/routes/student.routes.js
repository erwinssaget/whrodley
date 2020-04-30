const router = require('express').Router();

const studentController = require('../controllers/student.controller');
const requireAuthenticatedUser = require('../middleware/requireAuthenticatedUser');

router.use(requireAuthenticatedUser);

router.post('/', studentController.store);

module.exports = router;
