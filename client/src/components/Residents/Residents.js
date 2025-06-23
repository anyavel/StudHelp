import React, {useEffect, useState} from 'react';
import './residents.css';
import {Navbar} from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import {adminService, authService} from "../../services/";


const Residents = () => {

    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });

        adminService.getAllStudents().then(({data}) => setStudents(data.users))
    }, []);

    const handleClickEditResident = async (e) => {
        navigate('/editresident');
    }

    return (

        <div className={"admin-residents-container"}>
            <Navbar/>
            <div className="board">
                <div className="top-content">
                    <h1 className={"page-title"}>Список студентів</h1>
                    <div className="profile-info">
                        {user && <div className={"name-info"}>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                        </div>}
                    </div>
                </div>
                <div className="students">
                    <table className="students-table">
                        <tr className="table-titles">
                            <th className="table-title-name">ПІБ</th>
                            <th className="table-title-faculty">Факультет</th>
                            <th className="table-title-room">Кімната</th>
                            <th className="table-title-phone">Номер телефону</th>
                            <th className="table-title-email">Електронна пошта</th>
                        </tr>
                        {students.map(i => <tr className="student-items" key={i._id} >
                            <td className="table-name">{i.fullName}</td>
                            <td className="table-faculty">{i.faculty}</td>
                            <td className="table-room">{i.room}</td>
                            <td className="table-phone">{i.phoneNumber}</td>
                            <td className="table-email">{i.email}</td>
                            <td className="table-edit">
                                <button className="table-edit-button" onClick={handleClickEditResident}>
                                    Редагувати
                                </button>
                            </td>
                        </tr>)}
                    </table>
                </div>
                {/*<div className={"button-add-placement"}>*/}
                {/*    <button className={"add-student"}>+</button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Residents;