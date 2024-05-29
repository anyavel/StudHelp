import React, { useEffect, useState } from 'react';
import './profile.css';
import profile from '../../img/profile-placeholder.png';
import { useNavigate } from "react-router-dom";
import { authService } from '../../services';

export const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });
    }, []);

    const navigate = useNavigate();

    const handleClickSave = async (e) => {
        e.preventDefault();
        try {
            await authService.updatePersonalInfo(user);
        } catch (e) {
            const { response: { data } } = e;
            window.alert(data.message);
        }
    }

    const handleChange = (e) => {
        setUser(p => ({ ...p, [e.target.name]: e.target.value }));
    }

    const handleClickMain = async (e) => {
        navigate('/main');
    }
    const handleClickHelp = async (e) => {
        navigate('/help');
    }

    const handleClickRoom = async (e) => {
        navigate('/room');
    }

    const handleClickProfile = async (e) => {
        navigate('/profile');
    }

    const handleClickExit = async (e) => {
        authService.deleteTokens();
        navigate('/auth');
    }

    return (
        <div className={"room-container"}>
            <div className="menu">
                <h1 className={"logo"}>Stud Help</h1>
                <div className="menu-items">
                    <button className={"menu-item"} onClick={handleClickMain}>Головна</button>
                    <button className={"menu-item"} onClick={handleClickHelp}>Допомога</button>
                    <button className={"menu-item"} onClick={handleClickRoom}>Кімната</button>
                    <div className={"menu-item-container"}>
                        <input readOnly={true} className={"checked-menu-item"} />
                        <button className={"menu-item"} onClick={handleClickProfile}>Профіль</button>
                    </div>

                </div>
            </div>
            <div className={"board-room"}>
                <div className={"profile-picture-container"}>
                    <img src={profile} className={"profile-picture"} />
                    <button className={"change-profile-picture"}>Змінити фото</button>
                </div>
                {user && <div className={"profile-info-container"}>
                    <div className={"profile-info"}>
                        <div className={"info-label"}>Номер телефону</div>
                        <input value={user?.phoneNumber || ''} onChange={handleChange} name="phoneNumber" className={"info-text"} placeholder={'phone number'} />
                    </div>
                    <div className={"profile-info"}>
                        <div className={"info-label"}>Електронна пошта</div>
                        <input value={user?.email || ''} onChange={handleChange} name="email" className={"info-text"} placeholder={'email'} />
                    </div>
                </div>}
                <div className={"profile-buttons"}>
                    <button onClick={handleClickExit} className={"profile-button-exit"}>Вийти</button>
                    <button onClick={handleClickSave} className={"profile-button-save"}>Зберегти</button>
                </div>
            </div>

        </div>
    )
}