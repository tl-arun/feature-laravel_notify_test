import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationBox from './NotificationBox';
import createEchoInstance from './Echo';

const App = () => {
    const [user, setUser] = useState(null);
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const login = async () => {
            try {
                const res = await axios.post('http://localhost:8000/login', {
                    email: 'arunkumar.jaiswar@teamlease.com',
                    password: 'Admin123!@#',
                });

                const { token, user } = res.data;

                localStorage.setItem('token', token);
                setUser(user);

                const echoInstance = createEchoInstance(token);
                setEcho(echoInstance);
            } catch (err) {
                console.error('Login failed', err);
            }
        };

        login();
    }, []);

    if (!user || !echo) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <NotificationBox userId={user.id} echo={echo} />
        </div>
    );
};

export default App;