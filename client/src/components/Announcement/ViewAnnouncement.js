import React, { useEffect, useState } from 'react';
import './add-announcement.css';
import { announcementService, authService } from '../../services';
import { useParams } from 'react-router-dom';

export const ViewAnnouncement = () => {
    const { id } = useParams();
    const [{title, body, attachments, author}, setAnnouncement] = useState({title: '', body: '', attachments: [], author: null});
    const [{ _id }, setUser] = useState({ _id: null });

    useEffect(() => {
        announcementService.getById(id).then(({ data }) => setAnnouncement(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        })
        authService.me().then(({ data }) => setUser(data)).catch(e => {
            const { response: { data } } = e;
            window.alert(data.message);
        })
    }, []);

    const isAnnouncementMine = _id && author ? _id === author._id : false;

    return (
        <div className="container-view-announcement">
            <h1 className={"add-announcement-page-title"}>Перегляд оголошення</h1>
            <div className={"add-announcement-board"}>
                <div className={"announcement-info-board"}>
                    <h1 className={"announcement-info-title"}>Заголовок</h1>
                    <input value={title} className={"announcement-info-text"} readOnly={true}/>
                    <h1 className={"announcement-info-title"}>Текст</h1>
                    <textarea value={body} className={"announcement-info-text"} readOnly={true}></textarea>
                </div>
                <div className={"attachments-container"}>
                    {!!attachments.length && attachments.map(a => 
                    <img src={`http://localhost:5001/files/${a}`} className={"attachment"}/>)} 
                </div>
                <div className={"edit-announcement-buttons"}>
                    <button disabled={!isAnnouncementMine} className={"delete-announcement-button"}>Видалити</button>
                    <button disabled={!isAnnouncementMine} className={"add-announcement-button"}>Редагувати</button>
                </div>
            </div>
            
        </div>
    );
};
