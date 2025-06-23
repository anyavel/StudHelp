import React, { useEffect, useRef, useState } from 'react';
import './resident-request.css';
import { useNavigate } from 'react-router-dom';
import { announcementService } from '../../services'

export const ResidentRequest = () => {

    const [requestData, setRequestData] = useState({ title: '', body: '', attachments: [] });

    const handleChange = (e) => {
        setRequestData(p => ({ ...p, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleClick = async (e) => {
        const formData = new FormData();
        e.preventDefault();
        if(!!fileInputRef.current && !!fileInputRef.current.files.length) {
            for(const f of fileInputRef.current.files) {
                formData.append('attachments', f);
            }
        }
        try {
            formData.append('title', requestData.title);
            formData.append('body', requestData.body);
            await announcementService.add(formData);
            navigate('/main');
        } catch(e) {
            const { response: { data } } = e;
            window.alert(data.message);
        }
    }

    const openFileDialogue = () => {
        if(!!fileInputRef.current) fileInputRef.current.click();
    }
    return (
        <div className="container-add-announcement">
            <h1 className={"add-announcement-page-title"}>Додати оголошення</h1>
            <div className={"add-announcement-board"}>
                <div className={"announcement-info-board"}>
                    <h1 className={"announcement-info-title"}>Заголовок</h1>
                    <input value={requestData.title} onChange={handleChange} name="title" className={"announcement-info-text"}/>
                    <h1 className={"announcement-info-title"}>Текст</h1>
                    <textarea value={requestData.body} onChange={handleChange} name="body" className={"announcement-info-text"}></textarea>
                </div>
                <div className={"add-announcement-buttons"}>
                    <button className={"add-announcement-files"} onClick={openFileDialogue}>Прикріпити файл</button>
                    <input type='file' style={{ display: 'none' }} multiple={true} ref={fileInputRef} accept="image/jpg, image/jpeg, image/png"/>
                    <button onClick={handleClick} className={"add-announcement-button"}>Додати</button>
                </div>
            </div>
        </div>
    );
};