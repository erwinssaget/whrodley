const router = require('express').Router();

const { showLoginPage, login, logout, } = require('../controllers/login.controller'); // prettier-ignore
const validate = require('../requests/validate');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');

router.get('/', [redirectIfAuthenticated], showLoginPage);
router.get('/login', [redirectIfAuthenticated], showLoginPage);
router.post('/login', [redirectIfAuthenticated, ...validate('login')], login);
router.get('/logout', logout);

module.exports = router;
