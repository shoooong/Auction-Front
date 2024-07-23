import React, { useState } from "react";
import AdminNoticeTabs from "./AdminNoticeTabs";
import AdminNoticeList from "./AdminNoticeList";

const AdminNotice = () => {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div>
            <AdminNoticeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <AdminNoticeList activeTab={activeTab} />
        </div>
    );
};

export default AdminNotice;
