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

    return (
        <div className="login-page">
            <div className="text-container">
                <button className="back-button">Назад</button>
                <div className="login-text">
                    <h1 className="greeting">З поверненням!</h1>
                    <h2 className="instructions">Увійдіть в акаунт, щоб продовжити</h2>
                </div>
            </div>
            <div className="login-form-container">
                <h1 className="login-title">Вхід</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input value={loginData.email} onChange={handleChange} name="email" className="input" placeholder={"Електронна пошта"} />
                        <input value={loginData.password} onChange={handleChange} name="password" className="input" type="password" placeholder={"Пароль"} />
                    </div>
                    <div className="button-container">
                        <button className="button-forgot">Забули пароль?</button>
                        <button className="button">Увійти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};