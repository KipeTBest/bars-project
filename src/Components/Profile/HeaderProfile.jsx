import {NavLink} from "react-router-dom";
import React from "react";
import "./styles/headerProfile.css"


const HeaderProfile = () => {

    const nonactiveLink = 'header-profile-list__link header-profile-list__link--non-active';
    const normalLink = 'header-profile-list__link header-profile-list__link-active';

    return(
        <div className="header-profile">
            <ul className="header-profile__list">
                <li className="header-profile-list__item">
                    <NavLink
                        to="/profile"
                        className={({isActive}) =>
                            !isActive ? nonactiveLink : normalLink
                        }
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className="header-profile-list__item">
                    <NavLink
                        to="/favorite"
                        className={({isActive}) =>
                            !isActive ? nonactiveLink : normalLink
                        }
                    >
                        Избранные фильмы
                    </NavLink>
                </li>
            </ul>
        </div>
)
}

export default HeaderProfile