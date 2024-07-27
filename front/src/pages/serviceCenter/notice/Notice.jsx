import React, { useState, useEffect } from "react";
import NoticeTab from "./NoitceTab";
import NoticeList from "./NoticeList";
import { useLocation } from "react-router-dom";

const Notice = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialTab = query.get("tab") || "all";

    const [activeTab, setActiveTab] = useState(initialTab);


    useEffect(() => {
        const currentTab = query.get("tab") || "all";
        setActiveTab(currentTab);
    }, [location.search]);

    return (
        <div>
            <NoticeTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <NoticeList activeTab={activeTab} />
        </div>
    );
};

export default Notice;
