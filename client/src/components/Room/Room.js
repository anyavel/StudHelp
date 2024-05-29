import React, { useEffect, useState } from 'react';
import './room.css';
import placeholder from '../../img/photo-placeholder.jpeg';
import { useNavigate } from "react-router-dom";
import { authService } from '../../services';
import { getStaticUrl } from '../../configs';

export const Room = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me({ room: true }).then(({ data }) => setUser(data)).catch(e => {
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

    const roomNumber = user && user.room ? user.room.number : 0;
    const neighbours = user && user.room ? user.room.students.filter(s => s._id !== user._id) : [];
    const photos = user && user.room ? user.room.photos : [];

    return(
        <div className={"room-container"}>
            <div className="menu">
                <h1 className={"logo"}>Stud Help</h1>
                <div className="menu-items">
                    <button className={"menu-item"} onClick={handleClickMain}>Головна</button>
                    <button className={"menu-item"} onClick={handleClickHelp}>Допомога</button>
                    <div className={"menu-item-container"}>
                        <input readOnly={true} className={"checked-menu-item"}/>
                        <button className={"menu-item"} onClick={handleClickRoom}>Кімната</button>
                    </div>
                    <button className={"menu-item"} onClick={handleClickProfile}>Профіль</button>
                </div>
            </div>
            <div className={"board-room"}>
                <div className={"top-content"}>
                    <h1 className={"page-title"}>Кімната</h1>
                    {user && <div className={"name-info"}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>}
                </div>
                <div className={"room-info"}>
                    <h2 className={"room-info-title"}>Вас заселено до кімнати {roomNumber}</h2>
                    <div className={"room-info-neighbours"}>
                        <div className={"neighbours-title"}>Сусіди:</div>
                        <div className={"neighbours-info-container"}>
                        {neighbours.map(s => 
                        // <input readOnly={true} className={"neighbours-info"} placeholder={`${s.firstName}               ${s.phoneNumber}`}/>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: 300}}>
                                    <p>{s.firstName}</p> <p>{s.phoneNumber}</p>
                            </div>)}
                            {/* <input readOnly={true} className={"neighbours-info"}
                                   placeholder={"Імʼя               +380-12-123-45-67"}/>
                            <input readOnly={true} className={"neighbours-info"}
                                   placeholder={"Імʼя               +380-12-123-45-67"}/> */}
                        </div>
                    </div>
                    <div className={"room-info-photos"}>
                        <div className={"photos-title"}>Фото кімнати</div>
                        <div className={"photos-container"}>
                            {/* <img src={placeholder} className={"photo"}/>
                            <img src={placeholder} className={"photo"}/>
                            <img src={placeholder} className={"photo"}/> */}
                            {photos.map(p => <img src={getStaticUrl(p)} className={"photo"}/>)}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}