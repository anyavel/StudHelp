import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services'

export const Register = () => {

    const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', fathersName: '', faculty: '', phoneNumber: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await authService.register(registerData);
            navigate('/main');
        } catch(e) {
            const { response: { data } } = e;
            window.alert(data.message);
        }
    }

    const handleChange = (e) => {
        setRegisterData(p => ({ ...p, [e.target.name]: e.target.value }));
    }

    return (
        <div className="login-page">
            <div className="text-container">
                <button className="back-button">Назад</button>
                <div className="login-text">
                    <h1 className="greeting">Вітаємо!</h1>
                    <h2 className="instructions">Заповніть форму, щоб продовжити роботу</h2>
                </div>
            </div>
            <div className="login-form-container">
                <h1 className="login-title">Реєстрація</h1>
                <form>
                    <div className="input-container">
                        <input value={registerData.firstName} onChange={handleChange} name="firstName" className="input" placeholder={"Імʼя"}/>
                        <input value={registerData.lastName} onChange={handleChange} name="lastName" className="input" placeholder={"Прізвище"}/>
                        <input value={registerData.fathersName} onChange={handleChange} name="fathersName" className="input" placeholder={"По-батькові"}/>
                        <input value={registerData.faculty} onChange={handleChange} name="faculty" className="input" placeholder={"Факультет"}/>
                        <input value={registerData.phoneNumber} onChange={handleChange} name="phoneNumber" className="input" placeholder={"Номер телефону"}/>
                        <input value={registerData.email} onChange={handleChange} name="email" className="input" placeholder={"Електронна пошта"}/>
                        <input value={registerData.password} onChange={handleChange} name="password" className="input" type="password" placeholder={"Пароль"}/>
                    </div>
                    <div className="button-container">
                        <button onClick={handleClick} className="button">Зареєструватися</button>
                    </div>
                </form>
               
            </div>
        </div>
    );
};