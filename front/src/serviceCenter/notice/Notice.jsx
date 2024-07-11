import React from 'react'
import NoticeList from './NoticeList';
import NoticeTab from './NoitceTab';

const Notice = () => {
    return (
        <div className="app-container">
            <div className="content-container">
            <NoticeTab /><NoticeList />
            </div>
        </div>
    );
};

export default Notice;
