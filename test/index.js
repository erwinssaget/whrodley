const knex = require('../src/knex');

describe('Test Suite', function () {
  before(function () {
    return knex.migrate.latest();
  });

  require('./utils.spec');
  require('./controllers/index');
});
