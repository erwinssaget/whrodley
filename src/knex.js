const config = require('config');

const knex = require('knex')({
  ...config.get('postgres'),
});

module.exports = knex;
