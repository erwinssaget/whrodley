const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
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
        avatar: 'string',
        owner_id: 'integer',
        twilio_sid: 'string',
        twilio_auth_token: 'string',
        phone_number: 'string',
        friendly_phone_number: 'string',
      },
    };
  }

  static get relationMappings() {
    const Message = require('./Message');
    const User = require('./User');
    const Student = require('./Student')

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

      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'courses.id',
          through: {
            from: 'course_roster.course_id',
            to: 'course_roster.student_id',
          },
          to: 'students.id',
        },
      }
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
