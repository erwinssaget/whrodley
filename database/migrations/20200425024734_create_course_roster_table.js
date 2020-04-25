const tableName = 'course_roster';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.integer('student_id').unsigned();
    table.uuid('course_id');

    table.foreign('student_id').references('students.id');
    table.foreign('course_id').references('courses.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
