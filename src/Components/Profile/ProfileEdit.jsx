import React, {useEffect, useState} from "react";
import HeaderProfile from "./HeaderProfile";
import "./styles/profileEdit.css"

const ProfileEdit = () => {
    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        about: '',
        photo: ''
    });

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
    };

    const handleSave = () => {
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
            <HeaderProfile/>
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
                                className="profile-edit__input"
                                maxLength="20"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="profile-edit__firsName">
                            <label>Имя</label>
                            <input
                                className="profile-edit__input"
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
                                className="profile-edit__input"
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
                                maxLength="50"
                                name="about"
                                value={user.about}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

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
                </form>
            </div>
        </div>
    );
}

export default ProfileEdit;
