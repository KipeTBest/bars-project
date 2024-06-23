import React, {useEffect, useState} from "react";
import {NavLink, useNavigate } from "react-router-dom";

import UserData from "./UserData";
import HeaderProfile from "./HeaderProfile";

import "./styles/userProfile.css"

const UserProfile = () => {

    const navigate  = useNavigate ();

    const [user, setUser] = useState({
        role: "",
        auth: false,
    });


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setUser({
                role: storedUser.role,
                auth: storedUser.auth,
            });
        }
    }, []);

    const handleLogout = () => {

        const storedUser = JSON.parse(localStorage.getItem('user')) || {};

        const updatedUser = {
            ...storedUser,
            ...user,
            auth: false,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate("/login"); // Navigate to login page after logout
    };

    if(!user.auth){
        // TODO: Надо кидать пользователя на страницу логина или на главную страницу?
        navigate("/login");
    }
    return(
        <div className="user-profile">
            <HeaderProfile/>
            <UserData/>
            <div className="profile-wrapper">
                <ul className="profile-footer">
                    <li className="profile-footer__item">
                        <NavLink
                            to="/profile/edit"
                            className="profile-footer-editProfile" >
                                Изменить данные
                        </NavLink>
                    </li>

                    <li className="profile-footer__item">
                        <NavLink
                            to="/login"
                            className="profile-footer-exit"
                            onClick={handleLogout}>
                                Выйти
                        </NavLink>
                        </li>
                </ul>

                <ul className="profile-footer__admin">
                    {user.role === 'admin' && <li className="profile-footer__admin-item">
                        <NavLink
                            to="/adminPanel"
                            className="profile-footer-admin" >
                                Управление фильмами
                        </NavLink>
                    </li>
                        }
                </ul>
            </div>
        </div>
    )
}

export default UserProfile