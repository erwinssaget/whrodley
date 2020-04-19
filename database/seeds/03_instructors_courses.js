const Course = require('../../src/models/Course');
const User = require('../../src/models/User');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('course_instructors')
    .del()
    .then(async function () {
      // const course = await Course.query().first();
      // const user = await User.query().first();

      // Inserts seed entries
      return knex('course_instructors').insert([
        // {
        //   course_id: course.id,
        //   user_id: user.id,
        //   role: 'owner',
        //   created_at: new Date().toISOString(),
        //   updated_at: new Date().toISOString(),
        // },
      ]);
    });
};
