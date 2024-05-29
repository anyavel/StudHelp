import React from 'react';
import './authorization.css';
import placeholder from '../../img/profile-placeholder.png';
import { useNavigate } from 'react-router-dom';

export const Authorisation = () => {

    const navigate = useNavigate();
    const handleLoginClick = async (e) => {
        navigate('/sign-in');
    }

    const handleRegisterClick = async (e) => {
        navigate('/sign-up');
    }

    return (
        <div className={"container"}>
            <div className={"auth-container"}>
                <div className={"auth-label-container"}>
                    <h1 className="auth-label">StudHelp</h1>
                </div>
                <img src={placeholder} className={"auth-icon"}/>
                <div className={"auth-options-container"}>

                    <div className={"auth-options"}>
                        <div className={"auth-buttons"}>
                            <button className={"auth-button"} onClick={handleLoginClick}>Увійти</button>
                            <button className={"auth-button"} onClick={handleRegisterClick}>Зареєструватися</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

