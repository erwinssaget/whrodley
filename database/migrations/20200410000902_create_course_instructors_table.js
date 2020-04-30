const tableName = 'course_instructors';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.integer('user_id').unsigned();
    table.uuid('course_id');
    table.string('role', 25).defaultTo('instructor');

    table.foreign('user_id').references('users.id');
    table.foreign('course_id').references('courses.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
