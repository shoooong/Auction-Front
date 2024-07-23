import React, { useState } from "react";
import NoticeTabs from "./NoitceTab";
import NoticeList from "./NoticeList";

const Notice = () => {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div>
            <NoticeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <NoticeList activeTab={activeTab} />
        </div>
    );
};

export default Notice;
