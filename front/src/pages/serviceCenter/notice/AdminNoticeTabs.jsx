import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNoticeTabs = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    
    const tabButtons = [
        { label: "전체", value: "all" },
        { label: "공지", value: "notice" },
        { label: "이벤트", value: "event" },
    ];

    const handleClick = (value) => {
        setActiveTab(value);
        navigate(`/admin/notice?tab=${value}`);
    };

    return (
        <div className="service-tab">
            <div className="tabs">
                {tabButtons.map((tab, index) => (
                    <div
                        className={activeTab === tab.value ? "tab active" : "tab"}
                        key={index}
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

export default AdminNoticeTabs;
