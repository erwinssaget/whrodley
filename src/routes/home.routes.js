const router = require('express').Router();

const { showHomePage } = require('../controllers/home.controller');

// Url is /home

router.get('/', showHomePage);

module.exports = router;
