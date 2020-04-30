import Pusher from 'pusher-js';

const pusher = new Pusher('a7e19585f3af4f5b624e', {
  cluster: 'us3',
});

export default pusher;
