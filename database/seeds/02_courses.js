const { v4: uuidv4 } = require('uuid');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('courses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([
        {
          id: '0efbc1f7-c72b-406e-961b-f6725c55976c',
          name: 'Econ 101 (Fall 2019)',
          avatar: null,
          owner_id: 1,
          created_at: '2020-04-22 08:48:49.363+00',
          updated_at: '2020-04-22 08:55:40.482+00',
        },
        {
          id: '5d0d3901-1ecb-49dc-870d-3e96b0aa0b5b',
          name: 'Econ 201 (Spring 2020)',
          avatar: null,
          owner_id: 1,
          created_at: '2020-04-22 08:26:56.662+00',
          updated_at: '2020-04-22 08:26:56.662+00',
        },
      ]);
    });
};
