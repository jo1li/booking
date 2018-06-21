import axios from 'axios';
// You can use any cookie library or whatever
// library to access your client storage.
import cookie from 'cookie-machine';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(function(config) {
  const token = cookie.get('csrftoken');

  if ( token != null ) {
    config.headers['X-CSRFToken'] = token;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

export default instance;