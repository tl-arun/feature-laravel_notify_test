import React, { useEffect, useState } from 'react';
import echo from './Echo';

const NotificationBox = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const channel = echo.private(`notifications.${userId}`);

        channel.listen('.notification.sent', (e) => {
            setNotifications((prev) => [e.notification, ...prev]);
        });

        return () => {
            echo.leave(`notifications.${userId}`);
        };
    }, [userId]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Real-Time Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationBox;
