const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const knex = require('../knex');
const Message = require('./Message');

Model.knex(knex);

class Course extends Model {
  static get tableName() {
    return 'courses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: 'string',
      },
    };
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'courses.id',
          to: 'messages.course_id',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuidv4();
    this.created_at = this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Course;
