const router = require('express').Router();

const { showCreateCoursePage } = require('../controllers/courses.controller');

router.get('/courses/create', showCreateCoursePage);

module.exports = router;
