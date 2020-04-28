const tableName = 'messages';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id').unsigned().primary();
    table.string('smsId');
    table.text('body');
    table.string('to');
    table.string('from');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
