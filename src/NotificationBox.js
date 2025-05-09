import React, { useEffect, useState } from 'react';

const NotificationBox = ({ userId, echo }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!echo) return;

        const channel = echo.private(`notifications.${userId}`);

        channel.listen('.notification.sent', (e) => {
            setNotifications((prev) => [...prev, e.notification]);
        });

        return () => {
            echo.leave(`notifications.${userId}`);
        };
    }, [userId, echo]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((n, index) => (
                    <li key={index}>{n.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationBox;