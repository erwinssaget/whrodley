import axios from 'axios';

let token;

try {
  token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
} catch (err) {
  console.log('no meta tag with csrf token');
  // console.log(err);
}

const http = axios.create({
  withCredentials: true,
  headers: {
    'CSRF-Token': token || '',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default http;
