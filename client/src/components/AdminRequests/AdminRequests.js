import React, {useEffect, useState} from 'react';
import './admin-requests.css';
import {Navbar} from "../Navbar/Navbar";
import {authService} from "../../services";

const requests = [
    {
        title: 'Заява на проживання 2025-2026 н.р.',
        author: 'Вельгус Ганна',
        room: 604,
        status: 'Опрацьовано'
    }
]

const AdminRequest = ({request}) => {

    return (
        <div className="admin-request">
            <div className="admin-request-info">
                <h2 className={"admin-request-title"}>{request.title}</h2>
            </div>
            <div className={"admin-request-author-info"}>
                <div className={"admin-request-author"}>{request.author}</div>
                <div className={"admin-request-room"}>Кімната {request.room}</div>
            </div>
            <div className={"buttons-admin-request-container"}>
                <button className={"button-processed-request"}>{request.status}</button>
            </div>
        </div>
    )
}

export const AdminRequests = () => {
    const [statusFilter, setStatusFilter] = useState(null);
    const [items, setItems] = useState(requests);
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        });

    }, []);

    useEffect(() => {
        if (!statusFilter) setItems(requests);
        else setItems(requests.filter(i => i.status === statusFilter))
    }, [statusFilter])

    const handleStatusClick = (status) => {
        if (statusFilter === status) setStatusFilter(null);
        else setStatusFilter(status);
    }

    return (
        <div className="container-admin-requests">
            <Navbar></Navbar>
            <div className="board-admin-requests">
                <div className="top-content-admin-requests">
                    <h1 className={"page-title-admin-requests"}>Звернення</h1>
                    <div className="profile-info-admin-requests">
                        {user && <div className={"name-info-admin-requests"}>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                        </div>}
                    </div>
                </div>
                <div className="admin-requests-types">
                    <button onClick={() => handleStatusClick('Активне')} className="admin-requests-type">Активні</button>
                    <button onClick={() => handleStatusClick('Опрацьовано')} className="admin-requests-type">Опрацьовані</button>
                </div>
                <div className="admin-requests">
                    {items.map((i, index) => <AdminRequest request={i} key={index}/>)}

                </div>

            </div>
        </div>);
};