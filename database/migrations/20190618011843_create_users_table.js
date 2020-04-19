const tableName = 'users';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id').unsigned().primary();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email').unique().notNull();
    table.string('password').notNull();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
