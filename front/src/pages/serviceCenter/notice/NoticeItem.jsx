import React from "react";

import "./NoticeItem.css";

const NoticeItem = ({ type, title }) => {
    return (
        <li className="notice-item">
            <span className="notice-type">{type}</span>
            <span className="notice-title">{title}</span>
        </li>
    );
};

export default NoticeItem;