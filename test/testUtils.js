const cheerio = require('cheerio');

module.exports = {
  cookie: function cookie(res, name) {
    return res.headers['set-cookie'].filter(function (cookies) {
      return cookies.split('=')[0] === name;
    })[0];
  },

  extractCsrfToken: function extractCsrfToken(res) {
    var $ = cheerio.load(res.text);
    return $('[name=_csrf]').val();
  },

  cookies: function cookies(res) {
    return res.headers['set-cookie']
      .map(function (cookies) {
        return cookies.split(';')[0];
      })
      .join(';');
  },
};
