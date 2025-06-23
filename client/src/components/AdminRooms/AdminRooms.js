import React, {useEffect, useState} from 'react';
import '././admin-rooms.css';
import {Navbar} from "../Navbar/Navbar";
import {authService, roomService} from "../../services";
import {useNavigate} from "react-router-dom";


const AdminRooms = () => {

    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });

        roomService.getRooms().then(({data}) => setRooms(data.rooms))

    }, []);

    const handleClickEditRoom = async (e) => {
        navigate('/editroom');
    }
    // console.log(rooms)

    return (

        <div className={"admin-rooms-container"}>
            <Navbar></Navbar>
            <div className="admin-rooms-board">
                <div className="admin-rooms-top-content">
                    <h1 className={"admin-rooms-page-title"}>Кімнати</h1>
                    <div className="admin-rooms-profile-info">
                        {user && <div className={"admin-rooms-name-info"}>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                        </div>}
                    </div>
                </div>
                <div className="rooms">
                    <table className="rooms-table">
                        <tr className="rooms-table-titles">
                            <th className="rooms-table-title-number">Номер кімнати</th>
                            <th className="rooms-table-title-capacity">Кількість вільних місць</th>
                        </tr>
                        {rooms.map(room => <tr className="room-items" key={room._id}>
                            <td className="rooms-table-number">{room.number}</td>
                            <td className="rooms-table-capacity">{room.maxPeople}</td>
                            <td className="rooms-table-edit">
                                <button className="rooms-table-edit-button" onClick={handleClickEditRoom}>
                                    Редагувати
                                </button>
                            </td>
                        </tr>)}
                    </table>
                </div>
                <div className={"button-add-room-placement"}>
                    <button className={"add-room"}>+</button>
                </div>
            </div>
        </div>
    );
};

export default AdminRooms;