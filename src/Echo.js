// Echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const createEchoInstance = (token) =>
    new Echo({
        broadcaster: 'pusher',
        key: 'local',
        cluster: 'mt1',
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

export default createEchoInstance;