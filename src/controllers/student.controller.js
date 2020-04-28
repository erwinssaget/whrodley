const log = require('debug')('app:StudentController');

module.exports = {
  store: (req, res, next) => {
    log(req.body);

    res.json(req.body);
  },
};
