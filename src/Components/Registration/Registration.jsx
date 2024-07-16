import Arrow from './../Login/arrow.svg';
import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./registration.css"
import backgroundImg from "./../MovieCard/background.jpg";

const Registration = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Проверка, если текущий пользователь уже авторизован
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.auth) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleRegistration = (e) => {
        e.preventDefault();
        const form = e.target;
        const lastName = form.lastName.value;
        const firstName = form.firstName.value;
        const middleName = form.middleName.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!lastName || !firstName || !email || !password) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || { users: [] };
        const existingUser = users.users.find(user => user.email === email);

        if (existingUser) {
            alert("Пользователь с таким email уже зарегистрирован.");
            return;
        }

        // Создание нового пользователя
        const newUser = {
            email,
            password,
            role: "user",
            auth: true,
            lastName,
            firstName,
            middleName,
            photo: "https://i.pinimg.com/originals/58/72/74/587274fa96e6d1a1783915edc35f53b5.jpg",
            favoriteMovies: []
        };

        // Сохранение нового пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        users.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        navigate('/');
    }

    const handleHomePage = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleLoginPage = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className="page__registration">

            <div className="registration">

                <div className="registration-header">
                    <button className="registration-header__arrow" onClick={handleHomePage}>
                        <img src={Arrow} alt="arrow"/>
                    </button>
                    <span className="registration-header__title">
                        Зарегистрируйтесь в системе
                    </span>
                </div>

                <div className="registration-content">
                    <form onSubmit={handleRegistration}>
                        <label className="registration-content__form" htmlFor="name">Фамилия</label>
                        <input type="text" id="name" name="lastName" required/>

                        <label className="registration-content__form" htmlFor="name">Имя</label>
                        <input type="text" id="name" name="firstName" required/>

                        <label className="registration-content__form" htmlFor="name">Отчество</label>
                        <input type="text" id="name" name="middleName"/>

                        <label className="registration-content__form">Почта</label>
                        <input type="email" id="email" name="email" required/>

                        <label className="registration-content__form" htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password" required/>

                        <input type="submit" value="Регистрация"/>
                    </form>
                </div>

                <button className="registration-footer__toLogin" onClick={handleLoginPage}>
                    Вход
                </button>
            </div>
        </div>
    )
}

export default Registration;
