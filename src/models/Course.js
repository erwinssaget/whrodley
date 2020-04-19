const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const Message = require('./Message');
const User = require('./User');
const knex = require('../knex');

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
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'courses.owner_id',
          to: 'users.id',
        },
      },

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
