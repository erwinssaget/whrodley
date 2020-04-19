const { validationResult, matchedData } = require('express-validator');
const { hashPassword } = require('../utils');
const User = require('../models/User');
const Registration = require('../events/registration');

module.exports = {
  showRegisterPage: function (req, res) {
    return res.render('auth/register', {
      csrfToken: req.csrfToken(),
    });
  },

  register: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const oldInput = matchedData(req);
      return res.render('auth/register', {
        csrfToken: req.csrfToken(),
        errors: errors.array(),
        oldInput,
      });
    }

    let { firstName, lastName, email, password } = req.body;

    password = await hashPassword(password);

    const user = await User.query().insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    req.session.user = user;

    Registration.emit('signUp', user);

    return res.redirect('/courses/create');
  },
};
