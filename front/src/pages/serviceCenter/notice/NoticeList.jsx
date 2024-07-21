import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [activeTab] = useState("all");

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/notice/noticeList`)
            .then((response) => {
                setNotices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching notices:", error);
            });
    }, []);

    const filteredNotices = notices.filter((notice) => {
        if (activeTab === "all") {
            return true;
        } else {
            return notice.type === activeTab;
        }
    });

    return (
        <section className="notice-list">
            <ul>
                {filteredNotices.length === 0 ? (
                    <li>
                        <span className="title">No notices available</span>
                    </li>
                ) : (
                    filteredNotices.map((notice, index) => (
                        <li key={index}>
                            <span className="title">{notice.noticeTitle}</span>

                            <Link to={`/service/notice/${notice.noticeId}`}>
                                <span className="content">
                                    {notice.noticeContent}
                                </span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

export default NoticeList;
