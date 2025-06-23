import React, { useEffect, useRef, useState } from 'react';
import './edit-resident.css';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../services'

export const EditRoom = () => {

    const [room, setRoom] = useState(null);

    // useEffect(() => {
    //     authService.me().then(({ data }) => setUser(data)).catch(e => {
    //         const { response: { data } } = e;
    //         window.alert(data.message);
    //     });
    // }, []);

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
        <div className="container-edit-room">
            <h1 className={"edit-room-page-title"}>Редагувати кімнату</h1>
            <div className={"edit-room-board"}>
                <div className={"room-info-board"}>
                    {user && <div className="edit-room-input-container">

                    </div>}
                </div>
                <div className={"edit-room-buttons"}>
                    <button className={"delete-room-button"}>Видалити мешканця</button>
                    <button onClick={handleClickSave} className={"edit-room-button"}>Зберегти зміни</button>
                </div>
            </div>
        </div>
    );
};