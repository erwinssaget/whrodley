const Course = require('../../src/models/Course');
const User = require('../../src/models/User');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('course_instructors')
    .del()
    .then(async function () {
      // Inserts seed entries
      return knex('course_instructors').insert([
      ]);
    });
};
