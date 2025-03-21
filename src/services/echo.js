import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true, 
    encrypted: true, 
    authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'), // Include CSRF token
        },
    },
});

// Log Pusher connection status for debugging
echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log('Pusher connection state changed:', states.current);
});

echo.connector.pusher.connection.bind('error', (error) => {
    console.error('Pusher connection error:', error);
});

export default echo;