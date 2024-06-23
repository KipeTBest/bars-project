import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import Button from "../Button/Button";
import "./YourName.css"

function YourName() {
    const [user, setUser] = useState({
        role: "",
        auth: false,
        firstName: "",
        lastName: ""
    });


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setUser({
                role: storedUser.role,
                auth: storedUser.auth,
                firstName: storedUser.firstName,
                lastName: storedUser.lastName
            });
        }
    }, []);

    return (
    <div className="yourName">
        <span>Новинки:</span>
        <div className="yourNameInfo">
            {!user.auth ? <p>Войдите в аккаунт</p> : <p>Привет {user.firstName}</p>}
            <Link to="/profile"><Button data={"подоробнее"} style={20}/></Link>
        </div>
    </div>
    );
  }
  
  export default YourName;
  