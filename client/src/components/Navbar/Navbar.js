import React, { useEffect, useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import {authService} from "../../services";
// import { authService } from '../../services';

export const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });
    }, []);

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

    const handleClickDocuments = async (e) => {
        navigate('/helpdocuments');
    }

    const handleClickStuff = async (e) => {
        navigate('/helpstuff');
    }
    const handleClickConditions = async (e) => {
        navigate('/helpconditions');
    }

    const handleClickLinks = async (e) => {
        navigate('/helplinks');
    }

    const handleClickAppeal = async (e) => {
        navigate('/appeals');
    }

    const handleClickResidents = async (e) => {
        navigate('/residents');
    }

    const handleClickRooms = async (e) => {
        navigate('/rooms');
    }

    const handleClickResidentRequest = async (e) => {
        navigate('/residentrequest');
    }

    return (
        <div className="menu">
            <h1 className={"logo"}>Stud Help</h1>
            <div className="menu-items">
                <div className={"menu-item-container"}>
                    <input readOnly={true} className={"checked-menu-item"}/>
                    <button className={"menu-item"} onClick={handleClickMain}>Головна</button>
                </div>
                {user?.role === 'student' &&
                    <button className={"menu-item"} onClick={handleClickHelp}>Допомога</button>}
                {user?.role === 'student' &&
                    <button className={"menu-item"} onClick={handleClickResidentRequest}>Звернення</button>}
                {user?.role === 'student' &&
                    <button className={"menu-item"} onClick={handleClickRoom}>Кімната</button>}
                {user?.role === 'admin' &&
                    <button className={"menu-item"} onClick={handleClickAppeal}>Звернення</button>}
                {user?.role === 'admin' &&
                    <button className={"menu-item"} onClick={handleClickResidents}>Мешканці</button>}
                {user?.role === 'admin' &&
                    <button className={"menu-item"} onClick={handleClickRooms}>Кімнати</button>}
                <button className={"menu-item"} onClick={handleClickProfile}>Профіль</button>
            </div>
        </div>

    );
};