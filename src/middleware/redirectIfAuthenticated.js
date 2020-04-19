// Middleware to redirect user if they are authenticated
module.exports = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/home');
  }
  next();
};
