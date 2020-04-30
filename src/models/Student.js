const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Student extends Model {
  static get tableName() {
    return 'students';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'phone_number', 'friendly_phone_number'],

      properties: {
        name: 'string',
        phone_number: 'string',
        friendly_phone_number: 'string',
      },
    };
  }

  $beforeInsert() {
    this.created_at = this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Student;
