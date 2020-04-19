const User = require('../models/User');
const Registration = require('../events/registration');
const { hashPassword } = require('../utils');
const { validationResult, matchedData } = require('express-validator');

module.exports = {
  showLoginPage: function (req, res) {
    return res.render('auth/login', {
      csrfToken: req.csrfToken(),
    });
  },

  showRegisterPage: function (req, res) {
    return res.render('auth/register', {
      csrfToken: req.csrfToken(),
    });
  },

  // TODO: show reset password page

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

    return res.redirect('/teams/create');
  },

  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const oldInput = matchedData(req);

      return res.render('auth/login', {
        csrfToken: req.csrfToken(),
        errors: errors.array(),
        oldInput,
      });
    }

    req.session.user = req.user
      ? req.user
      : await User.query().findOne({ email });

    if (req.body.remember_me) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    }

    return res.redirect('home');
  },

  logout: async (req, res, next) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/login');
      });
    }
  },

  // TODO: implement password reset flow
  resetPassword: async (req, res) => {
    const { email } = req.body;
  },
  // resetPassword: async function(req, res) {
  //   let user;

  //   try {
  //     user = await User.findByEmail(email);
  //   } catch (err) {
  //     logger.error(err);
  //   }

  //   if (!user) return res.sendStatus(200);

  //   const emailTemplate = {
  //     from: 'support@app.com',
  //     to: user.email,
  //     subject: 'Password Reset',
  //     text: 'Paste this link in your browser to reset your password.',
  //     html: '<p><a href="">Click Link To Reset Password.</a></p>',
  //   };

  //   mailer.sendMail(emailTemplate, function(error) {
  //     if (error) {
  //       logger.error('reset password email ', error);
  //     }

  //     return res.sendStatus(200);
  //   });
  // },
};
