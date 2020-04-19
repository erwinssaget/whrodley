// error-messages.js
const NO_USER_PROVIDED = 'No user was provided.';
const USER_NOT_FOUND = 'There is no account associated with that email.';

const NO_NAME_PROVIDED = 'Please provide a valid name';

const NO_EMAIL_PROVIDED = 'Please provide a valid email.';
const EMAIL_IN_USE = 'That e-mail is already in use.';
const INVALID_EMAIL = 'Please provide a valid email.';

const NO_PASSWORD_PROVIDED = 'Please provide a password.';
const WRONG_PASSWORD_PROVIDED = 'Invalid Credentials';
const PASSWORD_TOO_SHORT = 'Password must be at least 8 characters';

const SERVOR_ERROR = 'Whoops... Something Went wrong';

module.exports = {
  NO_USER_PROVIDED,
  NO_NAME_PROVIDED,
  NO_EMAIL_PROVIDED,
  NO_PASSWORD_PROVIDED,
  WRONG_PASSWORD_PROVIDED,
  EMAIL_IN_USE,
  USER_NOT_FOUND,
  PASSWORD_TOO_SHORT,
  INVALID_EMAIL,
  SERVOR_ERROR,
};
