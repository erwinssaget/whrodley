const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

exports.hashPassword = async function (password) {
  if (!password) {
    throw new Error('A value is needed to hash');
  }

  try {
    const salt = crypto.randomBytes(16);

    const hashedPassword = await argon2i.hash(password, salt);

    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

exports.checkPassword = async function (hashedPassword, password) {
  try {
    const correct = await argon2i.verify(hashedPassword, Buffer.from(password));
    return correct;
  } catch (err) {
    throw err;
  }
};
