import Pusher from 'pusher-js';

const pusher = new Pusher('YOUR-APP-KEY-HERE', {
  cluster: 'us3',
});

export default pusher;
