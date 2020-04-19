const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Message extends Model {
  static get tableName() {
    return 'messages';
  }

  $beforeInsert() {
    this.created_at = this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Message;
