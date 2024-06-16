import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.auth) {
        return <Navigate to="/" />;
    }

    if (user.role !== 'admin') {
        return <div>Доступ запрещен</div>;
    }

    return element;
};

export default AuthRoute;