import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {authService} from "../../services";

export const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.requestPasswordReset(email);
            alert('Лист з відновленням паролю надіслано');
            navigate('/sign-in');
        } catch (e) {
            const {response: {data}} = e;
            window.alert(data.message);
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="login-login-form-container">
            <h1 className="login-login-title">Введіть пошту</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-input-container">
                    <input value={email} onChange={handleChange} name="email" className="input"
                           placeholder={"Електронна пошта"}/>
                </div>
                <div className="login-button-container">
                    <button className="login-button">Надіслати лист</button>
                </div>
            </form>
        </div>
    );
};