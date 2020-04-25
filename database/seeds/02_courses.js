const { v4: uuidv4 } = require('uuid');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('courses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([]);
    });
};
