import React, { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import "./styles/profileEdit.css";

const ProfileEdit = () => {
    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        about: '',
        photo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setUser({
                lastName: storedUser.lastName,
                firstName: storedUser.firstName,
                middleName: storedUser.middleName || '',
                email: storedUser.email,
                about: storedUser.about || '',
                photo: storedUser.photo
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateFields = () => {
        const newErrors = {};
        if (!user.lastName) newErrors.lastName = 'Поле Фамилия обязательно для заполнения';
        if (!user.firstName) newErrors.firstName = 'Поле Имя обязательно для заполнения';
        if (!user.email) newErrors.email = 'Поле Почта обязательно для заполнения';
        else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Некорректный email';

        return newErrors;
    };

    const handleSave = () => {
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = {
            ...storedUser,
            ...user,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Данные успешно сохранены!');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUser((prevUser) => ({
                ...prevUser,
                photo: reader.result
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-edit">
            <HeaderProfile />
            <div className="profile-wrapper">
                <div className="profile-photo">
                    {user.photo ? (
                        <img className="user-photo" src={user.photo} alt="Фото профиля"/>
                    ) : (
                        <img className="user-photo" src="./img/profile.jpg" alt="Фото профиля"/>
                    )}
                </div>
                <form className="profile-form">
                    <div className="profile-form__user-data">
                        <div className="profile-edit__lastName">
                            <label>Фамилия</label>
                            <input
                                className={`profile-edit__input ${errors.lastName ? 'error' : ''}`}
                                maxLength="20"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-edit__firstName">
                            <label>Имя</label>
                            <input
                                className={`profile-edit__input ${errors.firstName ? 'error' : ''}`}
                                maxLength="20"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-edit__middleName">
                            <label>Отчество</label>
                            <input
                                className="profile-edit__input"
                                maxLength="20"
                                name="middleName"
                                value={user.middleName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-edit__email">
                            <label>Почта</label>
                            <input
                                className={`profile-edit__input ${errors.email ? 'error' : ''}`}
                                maxLength="30"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-edit__about">
                            <label className="label-about">О себе</label>
                            <textarea
                                className="profile-edit__input"
                                maxLength="100"
                                name="about"
                                value={user.about}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>

                <div className="profile-wrapper__btn">
                <div className="profile-edit__photo">
                    <label htmlFor="photo-upload" className="profile-edit__photo-label">
                        <span className="text-btn__photo">Выбрать фото</span>
                    </label>
                    <input
                        id="photo-upload"
                        className="user-profile__photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </div>


                <div className="profile-edit__save" onClick={handleSave}>
                    Сохранить
                </div>
                </div>

                <div className="error-messages">
                    {(errors.email||errors.lastName||errors.firstName) && <ul> Данные не сохранены: </ul>}
                    {errors.lastName && <li className="error-message">{errors.lastName}</li>}
                    {errors.firstName && <li className="error-message">{errors.firstName}</li>}
                    {errors.email && <li className="error-message">{errors.email}</li>}
                </div>

            </div>
        </div>
    );
};

export default ProfileEdit;
