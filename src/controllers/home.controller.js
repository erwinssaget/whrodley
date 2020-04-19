module.exports = {
  showHomePage: (req, res) => {
    res.render('home', {
      csrfToken: req.csrfToken(),
    });
  },
};
