import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from './arrow.svg';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.auth) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        const usersData = JSON.parse(localStorage.getItem('users')) || { users: [] };
        const existingUser = usersData.users.find(user => user.email === email && user.password === password);

        if (existingUser) {
            existingUser.auth = true;
            localStorage.setItem('user', JSON.stringify(existingUser));
            console.log("User authorized");
            navigate('/profile');
        } else {
            alert('Неверный email или пароль');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/registration');
    };

    const handlePage = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="login">

            <div className="login-header">
                <button className="login-header__arrow" onClick={handlePage}>
                    <img src={Arrow} alt="arrow"/>
                </button>
                <span className="login-header__title">
                    Войдите в систему
                </span>
            </div>

            <div className="login-content">
                <form onSubmit={handleLogin}>

                    <label htmlFor="email">Почта</label>
                    <input
                        type="email"
                        className="login__form__input"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        className="login__form__input"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input type="submit" value="Войти"/>
                </form>
            </div>

            <button className="login-footer__toRegistration" onClick={handleRegister}>
                Регистрация
            </button>
        </div>
    );
};

export default Login;
