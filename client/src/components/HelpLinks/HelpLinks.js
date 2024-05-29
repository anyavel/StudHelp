import React, { useEffect, useState } from 'react';
import './help-article.css';

export const HelpLinks = () => {

    return (

        <div className="container-help-article">
            
            <div className="article-board">
                <div className='article-items'>
                    <h1 className='article-title'>Корисні посилання</h1>
                    <div className='article-text'>
                        Ось кілька посилань, якими найчастіше користуються мешканці гуртожитка. Вони точно колись знадобляться і допоможуть вирішити проблему:
                        <ul>
                            <li>
                                <b>Чат-бот гуртожитку в телеграмі: </b> @DormitoryFAQBot
                            </li>
                            <li>
                                <b>Магазинчик на 1 поверсі: </b> @stud_shop3
                            </li>
                            <li>
                                <b>Пральні машинки: </b> <a href='https://lcapp.bilantek.com/#homepage'> https://lcapp.bilantek.com/#homepage </a> код 744, 743
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};