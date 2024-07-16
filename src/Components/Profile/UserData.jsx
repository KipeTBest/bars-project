import React, { useState, useEffect } from 'react';
import "./styles/userData.css"

const UserData = () => {

    const [user, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        about: '',
        photo: ''
    });

    useEffect(() => {
        // Проверяем, есть ли данные пользователя в localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setFormData({
                lastName: storedUser.lastName,
                firstName: storedUser.firstName,
                middleName: storedUser.middleName || null,
                email: storedUser.email,
                about: storedUser.about || null,
                photo: storedUser.photo || null,
            });
        }
    }, []);

    return(
        <div className="profile-info">
            <ul className="user-details">
                <li className="profile-info__user-photo">
                    {user.photo ? (
                        <img className="user-photo" src={user.photo} alt="Фото профиля"/>
                    ) : (
                        <img className="user-photo" src="./img/profile.jpg" alt="Фото профиля"/>
                    )}
                </li>

                <li className="user-detail__name">
                    {`${user.lastName} ${user.firstName}`}
                </li>

                <li className="user-detail__email">
                    {user.email}
                </li>

                {user.about && <>
                    <li className="user-detail__about">О себе: {user.about} </li>
                </>}
            </ul>
        </div>
    )
}

export default UserData;
