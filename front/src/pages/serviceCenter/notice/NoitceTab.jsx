import React from 'react';
import '../../../styles/noticetab.css'

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabButtons = [
        { label: '전체', value: 'all' },
        { label: '공지', value: 'notice' },
        { label: '이벤트', value: 'event' }
    ];

    const handleClick = (value) => {
        setActiveTab(value);
    };

    return (
        <div className="tabs">
            {tabButtons.map((tab, index) => (
                <button
                    key={index}
                    className={activeTab === tab.value ? 'active' : ''}
                    onClick={() => handleClick(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
