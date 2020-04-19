const { body, check } = require('express-validator');
const msg = require('../errorMessages');
const User = require('../models/User');
const { checkPassword } = require('../utils');
const debug = require('debug')('app:validation');

module.exports = (request) => {
  switch (request) {
    case 'login':
      return [
        check('email', msg.NO_EMAIL_PROVIDED)
          .exists()
          .isEmail()
          .normalizeEmail()
          .bail()
          .custom(async (value, { req }) => {
            const user = await User.query().findOne({
              email: value,
            });

            if (!user) {
              throw new Error('No account is associated with that email.');
            }
            // storing this here to prevent multiple db calls
            req.user = user;
          }),
        check('password', msg.NO_PASSWORD_PROVIDED)
          .exists()
          .not()
          .isEmpty()
          .bail()
          .custom(async (value, { req }) => {
            const user = req.user
              ? req.user
              : await User.query().findOne({ email: req.body.email });

            // TODO: error handling in the event that this fails for any reason
            if (user) {
              const correctPassword = await checkPassword(user.password, value);

              if (!correctPassword) {
                throw new Error('Invalid Credentials');
              }
            }
          }),
      ];

    case 'register':
      return [
        check('firstName', 'First name is required').exists().not().isEmpty(),
        check('lastName', 'Last name is required').exists().not().isEmpty(),
        check('email', msg.NO_EMAIL_PROVIDED)
          .exists()
          .isEmail()
          .normalizeEmail()
          .custom(async (value, { req }) => {
            const user = await User.query().findOne({
              email: value,
            });

            if (user) {
              throw new Error('That email is already in use.');
            }
          }),
        check('password', msg.NO_PASSWORD_PROVIDED).exists().not().isEmpty(),
        check('passwordConfirmation').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }

          return true;
        }),
      ];

    default:
      return [];
  }
};
