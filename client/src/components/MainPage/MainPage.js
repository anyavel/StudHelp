import React, { useEffect, useState } from 'react';
import { authService, announcementService } from '../../services';
import './main-page.css';
import { useNavigate } from 'react-router-dom';


export const MainPage = () => {
    const [user, setUser] = useState(null);
    const [{ announcements, pagesCount }, setAnnouncementData] = useState({ announcements: [], pagesCount: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });
        announcementService.getAll().then(({ data }) => setAnnouncementData(data)).catch(e => {
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

    const handleClickAddAnnouncement = async (e) => {
        navigate('/addannouncement');
    }

    const handleClickAnnouncement = (id) => {
        navigate(`/announcement/${id}`);
    }

    return (
        <div className="container-main">
            <div className="menu">
                <h1 className={"logo"}>Stud Help</h1>
                <div className="menu-items">
                    <div className={"menu-item-container"}>
                        <input readOnly={true} className={"checked-menu-item"} />
                        <button className={"menu-item"} onClick={handleClickMain}>Головна</button>
                    </div>
                    <button className={"menu-item"} onClick={handleClickHelp}>Допомога</button>
                    <button className={"menu-item"} onClick={handleClickRoom}>Кімната</button>
                    <button className={"menu-item"} onClick={handleClickProfile}>Профіль</button>
                </div>
            </div>
            <div className="board">
                <div className="top-content">
                    <h1 className={"page-title"}>Оголошення</h1>
                    {user && <div className={"name-info"}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>}
                </div>
                <div className="announcements">
                    {
                        announcements.length && announcements.map(i =>
                            <button key={i._id} className="announcement" onClick={() => handleClickAnnouncement(i._id)}>
                                <h2 className={"announcement-title"}>{i.title}</h2>
                            </button>)
                    }
                    {/*
                    <div className="announcement">
                        <h2 className={"announcement-title"}>Шановні мешканці!</h2>
                    </div>
                     <div className="announcement">
                        <h2 className={"announcement-title"}>Шановні мешканці!</h2>
                    </div>
                    <div className="announcement">
                        <h2 className={"announcement-title"}>Шановні мешканці!</h2>
                    </div>
                    <div className="announcement">
                        <h2 className={"announcement-title"}>Шановні мешканці!</h2>
                    </div> */}
                </div>
                <div className={"button-add-placement"}>
                    <button className={"add-announcement"} onClick={handleClickAddAnnouncement}>+</button>
                </div>
            </div>
        </div>
    );
};
