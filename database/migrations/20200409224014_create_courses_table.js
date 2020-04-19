const tableName = 'courses';

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.uuid('id').primary();
    table.string('name', 255).notNullable();
    table.string('avatar').nullable();
    table.integer('owner_id').unsigned();

    // Twilio specific data
    table.string('twilio_sid').nullable();
    table.string('twilio_auth_token').nullable();
    table.string('phone_number').nullable();
    table.string('friendly_phone_number').nullable();
    table.jsonb('twilio_meta').nullable();

    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('owner_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
