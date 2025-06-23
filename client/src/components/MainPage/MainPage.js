import React, {useEffect, useState} from 'react';
import {authService, announcementService} from '../../services';
import './main-page.css';
import {useNavigate} from 'react-router-dom';
import {Navbar} from "../Navbar/Navbar";


export const MainPage = () => {
    const [user, setUser] = useState(null);
    const [{announcements, pagesCount}, setAnnouncementData] = useState({announcements: [], pagesCount: 0});
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        authService.me().then(({data}) => setUser(data)).catch(e => {
            const {response: {data}} = e;
            window.alert(data.message);
        });
        announcementService.getAll().then(({data}) => setAnnouncementData(data)).catch(e => {
            const {response: {data}} = e;
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

    const handleClickAppeal = () => {
        navigate(`/appeals`);
    }

    const handleClickResidents = () => {
        navigate(`/residents`);
    }

    const handleClickRooms = () => {
        navigate(`/rooms`);
    }

    return (
        <div className="main-container-main">
            <Navbar></Navbar>
            <div className="main-board">
                <div className="main-top-content">
                    <h1 className={"main-page-title"}>Оголошення</h1>
                    {user && <div className={"main-name-info"}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>}
                </div>
                <div className="main-announcements">
                    {
                        announcements.length && announcements.map(i =>
                            <button key={i._id} className="main-announcement"
                                    onClick={() => handleClickAnnouncement(i._id)}>
                                <h2 className={"main-announcement-title"}>{i.title}</h2>
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
                <div className={"main-button-add-placement"}>
                    <button className={"main-add-announcement"} onClick={handleClickAddAnnouncement}>+</button>
                </div>
            </div>
        </div>
    );
};
