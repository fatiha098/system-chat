import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    authEndpoint: `http://localhost:8000/api/broadcasting/auth`,
    auth: {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
});

window.Echo = echo;

echo.connector.pusher.connection.bind('state_change', (states) => {
  console.log('Pusher state changed:', states);
});

export default echo;