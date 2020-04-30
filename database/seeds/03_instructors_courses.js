const Course = require('../../src/models/Course');
const User = require('../../src/models/User');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('course_instructors')
    .del()
    .then(async function () {
      // Inserts seed entries
      return knex('course_instructors').insert([
        {
          user_id: 1,
          course_id: '5d0d3901-1ecb-49dc-870d-3e96b0aa0b5b',
          role: 'instructor',
        },
        {
          user_id: 1,
          course_id: '0efbc1f7-c72b-406e-961b-f6725c55976c',
          role: 'instructor',
        },
      ]);
    });
};
