import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtAxios from "../../../pages/user/jwtUtil";
import { SERVER_URL } from "../../../api/serverApi";

const NoticeList = ({ activeTab }) => {
    const [notices, setNotices] = useState([]);
    const [luckyDraws, setLuckyDraws] = useState([]);

    useEffect(() => {
        const fetchNoticesAndLuckyDraws = async () => {
            try {
                const response = await jwtAxios.get(`${SERVER_URL}/notice/user/combinedNoticeList`);
                const { notices, luckyDrawAnnouncements } = response.data;
                setNotices(notices);
                setLuckyDraws(luckyDrawAnnouncements);
            } catch (error) {
                console.error("Error fetching notices and lucky draws:", error);
            }
        };

        fetchNoticesAndLuckyDraws();
    }, []);

    const filteredNotices = notices.filter((notice) => {
        if (activeTab === "all") {
            return true;
        } else {
            return activeTab === "notice";
        }
    });

    const filteredLuckyDraws = luckyDraws.filter((draw) => {
        if (activeTab === "all") {
            return true;
        } else {
            return activeTab === "event";
        }
    });

    return (
        <section className="notice-list">
            <ul>
                {filteredNotices.length === 0 && filteredLuckyDraws.length === 0 ? (
                    <li>
                        <span className="title">No notices or lucky draws available</span>
                    </li>
                ) : (
                    [...filteredNotices, ...filteredLuckyDraws].map((item) => (
                        <li key={item.noticeId || item.luckyAnnouncementId}>
                            <Link to={`/service/notice/${item.noticeId ? `notice/${item.noticeId}` : `event/${item.luckyAnnouncementId}`}`}>
                                <div>
                                    <span className="type">
                                        {item.noticeTitle ? "일반공지" : "이벤트 공지"}
                                    </span>
                                    <span className="title">
                                        {item.noticeTitle || item.luckyTitle}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

export default NoticeList;
