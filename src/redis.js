const config = require('config');
const redis = require('redis');

const redisClient = redis.createClient({
  url: config.get('redis'),
});

redisClient.on('error', function (error) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }
});

module.exports = redisClient;
