const tableName = 'messages';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id').unsigned().primary();
    table.string('sms_sid');
    table.text('body');
    table.uuid('course_id');
    table.string('to');
    table.string('from');
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('course_id').references('courses.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
