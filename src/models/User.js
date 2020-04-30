const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'password'],

      properties: {
        email: { type: ['string', 'null'] },
        password: 'string',
        activeTeamId: 'string',
      },
    };
  }

  static get relationMappings() {
    const Course = require('./Course');

    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'users.id',
          through: {
            from: 'course_instructors.user_id',
            to: 'course_instructors.course_id',
            extra: ['role'],
          },
          to: 'courses.id',
        },
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

module.exports = User;
