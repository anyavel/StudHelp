import React, { useEffect, useState } from 'react';
import './help.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';

export const Help = () => {
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
    
    return (

        <div className="container-help">
            <div className="menu">
                <h1 className={"logo"}>Stud Help</h1>
                <div className="menu-items">
                    <button className={"menu-item"} onClick={handleClickMain}>Головна</button>
                    <div className={"menu-item-container"}>
                        <input readOnly={true} className={"checked-menu-item"}/>
                        <button className={"menu-item"} onClick={handleClickHelp}>Допомога</button>
                    </div>
                    <button className={"menu-item"} onClick={handleClickRoom}>Кімната</button>
                    <button className={"menu-item"} onClick={handleClickProfile}>Профіль</button>
                </div>
            </div>
            <div className={"board-help"}>
                <div className={"top-content"}>
                    <h1 className={"page-title"}>Теми питань</h1>
                    {user && <div className={"name-info"}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>}
                </div>
                <div className={"help-items-container"}>
                    <button className={"help-item"} onClick={handleClickDocuments}>
                        <h2 className={"help-item-title"}>Документи</h2>
                    </button>
                    <button className={"help-item"} onClick={handleClickStuff}>
                        <h2 className={"help-item-title"}>Речі</h2>
                    </button>
                    <button className={"help-item"} onClick={handleClickConditions}>
                        <h2 className={"help-item-title"}>Умови проживання</h2>
                    </button>
                    <button className={"help-item"}>
                        <h2 className={"help-item-title"}>Про гуртожиток</h2>
                    </button>
                    <button className={"help-item"}>
                        <h2 className={"help-item-title"}>Місця поблизу</h2>
                    </button>
                    <button className={"help-item"} onClick={handleClickLinks}>
                        <h2 className={"help-item-title"}>Корисні посилання</h2>
                    </button>
                </div>
            </div>
        </div>
    );
};