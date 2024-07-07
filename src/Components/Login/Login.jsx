import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === email && user.password === password) {
            user.auth = true;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/profile');
        } else {
            alert('Неправильный email или пароль');
        }
    };



    return (
        <div className="login-container">
            <h2>Войдите в систему</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Вход</button>
            </form>
            <button className="registration">Регистрация</button>
        </div>
    );
};

export default Login;