const { validationResult, matchedData } = require('express-validator');

module.exports = {
  showLoginPage: function (req, res) {
    return res.render('auth/login', {
      csrfToken: req.csrfToken(),
    });
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

    return res.redirect('/home');
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
};
