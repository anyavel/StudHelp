import React, { useState } from 'react';
import { authService } from '../../services'
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(loginData);
            navigate('/main');
        } catch(e) {
            const { response: { data } } = e;
            window.alert(data.message);
        }
    }

    const handleChange = (e) => {
        setLoginData(p => ({ ...p, [e.target.name]: e.target.value }));
    }

    const handleForgetPassword = (e) => {
        // e.preventDefault();
        // navigate('/request-password-reset')
    }

    return (
        <div className="login-login-page">
            <div className="login-text-container">
                <button className="login-back-button">Назад</button>
                <div className="login-login-text">
                    <h1 className="login-greeting">З поверненням!</h1>
                    <h2 className="login-instructions">Увійдіть в акаунт, щоб продовжити</h2>
                </div>
            </div>

            <div className="login-login-form-container">
                <h1 className="login-login-title">Вхід</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-input-container">
                        <input value={loginData.email} onChange={handleChange} name="email" className="input" placeholder={"Електронна пошта"} />
                        <input value={loginData.password} onChange={handleChange} name="password" className="input" type="password" placeholder={"Пароль"} />
                    </div>
                    <div className="login-button-container">
                        <button className="login-button-forgot" onClick={handleForgetPassword}>Забули пароль?</button>
                        <button className="login-button">Увійти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};