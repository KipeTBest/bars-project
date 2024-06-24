import "./Login.css"
import { useState } from 'react'
import LoginButton from "./LoginButton/LoginButton"
import { Link } from "react-router-dom";
const Login = () => {
    
    return(
        <div className="login">
            <div className='login-form'>
                <h1 className="login-title">Войдите в систему</h1>
                <div className="input-info">
                    <span className="text-input">Почта</span>
                    <input type='title' name='login' className="log"/>
                </div>
                <div className="input-info">
                    <span className="text-input">Пороль</span>
                    <input type='password' name='pass' className="pass"/>
                </div>
                <div className="login-buttons">
                    <Link to=""><LoginButton style={50} data={"Вход"} /></Link>
                    <Link to=""><LoginButton style={50} data={"Регистация"}/></Link>
                </div>
            </div>
        </div>
    )
}

export default Login