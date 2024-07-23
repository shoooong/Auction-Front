import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNoticeTabs from "./AdminNoticeTabs";
import AdminNoticeList from "./AdminNoticeList";

const AdminNotice = () => {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div>
            <AdminNoticeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
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
