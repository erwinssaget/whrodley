const config = require('config');
const redis = require('redis');

const redisClient = redis.createClient({
  url: config.get('redis'),
});

module.exports = redisClient;
