const tableName = '';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    //
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
