import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationBox from './NotificationBox';

const App = () => {
    const [user, setUser] = useState(null);

    // Simulate login
    useEffect(() => {
        const login = async () => {
            const res = await axios.post('http://localhost:8003/login', {
                email: 'arunkumar.jaiswar@teamlease.com',
                password: 'Admin123!@#',
            });

            const { token, user } = res.data;
            console.log(res.data);
            //localStorage.setItem('token', token);
            setUser(user);
        };

        login();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <NotificationBox userId={user.id} />
        </div>
    );
};

export default App;