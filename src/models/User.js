const { Model } = require('objection');
const knex = require('../knex');
const Course = require('./Course');

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
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'users.id',
          through: {
            from: 'instructors_courses.user_id',
            to: 'instructors_courses.course_id',
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
