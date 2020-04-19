const { v4: uuidv4 } = require('uuid');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('courses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([
        // {
        //   id: uuidv4(),
        //   name: 'Cheesits',
        //   owner_id: 1,
        //   twilio_sid: '',
        //   twilio_auth_token: '',
        //   phone_number: '+14048825335',
        //   friendly_phone_number: '(404) 882-5335',
        //   created_at: new Date().toISOString(),
        //   updated_at: new Date().toISOString(),
        // },
      ]);
    });
};
