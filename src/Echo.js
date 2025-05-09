import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Optional: required only for older Pusher setups
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // match PUSHER_APP_KEY in Laravel
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://localhost:8003/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    },
});

export default echo;
