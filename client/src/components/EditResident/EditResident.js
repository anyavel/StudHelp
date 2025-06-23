import React, { useEffect, useRef, useState } from 'react';
import './edit-resident.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services'

export const EditResident = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });
    }, []);

    const handleChange = (e) => {
        setUser(p => ({ ...p, [e.target.name]: e.target.value }));
    }

    const handleClickSave = async (e) => {
        e.preventDefault();
        try {
            await authService.updatePersonalInfo(user);
        } catch (e) {
            const { response: { data } } = e;
            window.alert(data.message);
        }
    }

    return (
        <div className="container-edit-resident">
            <h1 className={"edit-resident-page-title"}>Редагувати мешканця</h1>
            <div className={"edit-resident-board"}>
                <div className={"resident-info-board"}>
                    {user && <div className="input-container">
                        <input value={user.firstName} onChange={handleChange} name="firstName" className="input-edit-resident"
                               placeholder={user.firstName}/>
                        <input value={user.lastName} onChange={handleChange} name="lastName" className="input-edit-resident"
                               placeholder={"Прізвище"}/>
                        <input value={user.fathersName} onChange={handleChange} name="fathersName"
                               className="input-edit-resident" placeholder={"По-батькові"}/>
                        <input value={user.faculty} onChange={handleChange} name="faculty" className="input-edit-resident"
                               placeholder={"Факультет"}/>
                        <input value={user.phoneNumber} onChange={handleChange} name="phoneNumber"
                               className="input-edit-resident" placeholder={"Номер телефону"}/>
                        <input value={user.email} onChange={handleChange} name="email" className="input-edit-resident"
                               placeholder={"Електронна пошта"}/>
                    </div>}
                </div>
                <div className={"edit-resident-buttons"}>
                    <button className={"delete-resident-button"}>Видалити мешканця</button>
                    <button onClick={handleClickSave} className={"edit-resident-button"}>Зберегти зміни</button>
                </div>
            </div>
        </div>
    );
};