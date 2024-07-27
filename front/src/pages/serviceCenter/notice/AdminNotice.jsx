import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNoticeTabs from "./AdminNoticeTabs";
import AdminNoticeList from "./AdminNoticeList";
import { Link } from "react-router-dom";

const AdminNotice = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [activeTab, setActiveTab] = useState(query.get("tab") || "all");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <AdminNoticeTabs activeTab={activeTab} setActiveTab={handleTabChange} />
            <Link to="/admin/notice/register" className="create-notice-btn">
                일반 공지사항 등록하기
            </Link>
            <Link to="/admin/notice/eventregister" className="create-notice-btn">
                이벤트 공지사항 등록하기
            </Link>
            <AdminNoticeList activeTab={activeTab} />
        </div>
    );
};

export default AdminNotice;
