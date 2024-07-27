import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NoticeTab = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabButtons = [
        { label: "전체", value: "all" },
        { label: "공지", value: "notice" },
        { label: "이벤트", value: "event" },
    ];

    const handleClick = (value) => {
        setActiveTab(value);
        // URL을 업데이트하여 탭 상태를 반영
        navigate(`${location.pathname}?tab=${value}`);
    };

    return (
        <div className="service-tab">
            <div className="tabs">
                {tabButtons.map((tab) => (
                    <div
                        className={activeTab === tab.value ? "tab active" : "tab"}
                        key={tab.value}
                    >
                        <button
                            className={activeTab === tab.value ? "active" : ""}
                            onClick={() => handleClick(tab.value)}
                        >
                            {tab.label}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeTab;
