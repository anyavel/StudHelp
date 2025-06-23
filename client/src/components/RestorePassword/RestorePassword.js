import React, {useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {authService} from "../../services";

export const RestorePassword = () => {
    const [params] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                alert('Паролі не сходяться');
                return;
            }
            await authService.resetPassword(password, params.get('token'));
            alert('Пароль відновлено');
            navigate('/sign-in');
        } catch (err) {
            const {response: {data}} = err;
            window.alert(data.message);
        }
    }

    const handleChange = (e, set) => {
        set(e.target.value);
    }

    return (
        <div className="login-login-form-container">
            <h1 className="login-login-title">Введіть новий пароль</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-input-container">
                    <input value={password} onChange={(e) => handleChange(e, setPassword)} className="input"
                           type={'password'}
                           placeholder={"Пароль"}/>
                    <input value={confirmPassword} onChange={(e) => handleChange(e, setConfirmPassword)}
                           className="input" type={'password'}
                           placeholder={"Підтвердіть пароль"}/>
                </div>
                <div className="login-button-container">
                    <button className="login-button">Скинути пароль</button>
                </div>
            </form>
        </div>
    );
};