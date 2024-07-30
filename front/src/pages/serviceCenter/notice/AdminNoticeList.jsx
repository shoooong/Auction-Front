import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import jwtAxios from "utils/jwtUtil";
import './AdminNotice.css';

const AdminNoticeList = ({ activeTab }) => {
    const [notices, setNotices] = useState([]);
    const [luckyDraws, setLuckyDraws] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 한 페이지당 항목 수
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab") || "all";

    useEffect(() => {
        const fetchNoticesAndLuckyDraws = async () => {
            try {
                const response = await jwtAxios.get(`/admin/user/combinedNoticeList`);
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
        if (tab === "all") return true;
        return tab === "notice";
    });

    const filteredLuckyDraws = luckyDraws.filter((draw) => {
        if (tab === "all") return true;
        return tab === "event";
    });

    // 페이지네이션 적용
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedNotices = filteredNotices.slice(startIndex, endIndex);
    const paginatedLuckyDraws = filteredLuckyDraws.slice(startIndex, endIndex);

    const totalItems = filteredNotices.length + filteredLuckyDraws.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section className="notice-list">
            <ul>
                {paginatedNotices.length === 0 && paginatedLuckyDraws.length === 0 ? (
                    <li>
                        <span className="title">No notices or lucky draws available</span>
                    </li>
                ) : (
                    [...paginatedNotices, ...paginatedLuckyDraws].map((item) => (
                        <li key={item.noticeId || item.luckyAnnouncementId}>
                            <Link to={`/admin/notice/${item.noticeId ? `notice/${item.noticeId}` : `event/${item.luckyAnnouncementId}`}?tab=${tab}`}>
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
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                <span>페이지 {currentPage} / {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </section>
    );
};

export default AdminNoticeList;
