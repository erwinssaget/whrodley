require('dotenv').config();
const config = require('config');

const client = process.env.DB_CLIENT;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;

const migrations = {
  directory: './database/migrations',
  tableName: 'migrations',
};

const seeds = {
  directory: './database/seeds',
};

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    debug: true,
    migrations,
    seeds,
  },

  development: {
    ...config.get('postgres'),
    migrations,
    seeds,
  },

  staging: {
    client: client,
    connection: {
      host: host,
      database: database,
      user: user,
      password: password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
    seeds,
  },

  production: {
    host: host,
    client: client,
    connection: dbUrl,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
    seeds,
  },
};
