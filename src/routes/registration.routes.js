const router = require('express').Router();

const validate = require('../requests/validate');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
const { showRegisterPage, register } = require('../controllers/registration.controller'); // prettier-ignore

router.get('/', [redirectIfAuthenticated], showRegisterPage);
router.post( '/', [redirectIfAuthenticated, ...validate('register')], register); // prettier-ignore

module.exports = router;
