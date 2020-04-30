const config = require('config');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: config.get('pusher.appId'),
  key: config.get('pusher.key'),
  secret: config.get('pusher.secret'),
  cluster: config.get('pusher.cluster'),
  encrypted: true,
});

module.exports = pusher;
