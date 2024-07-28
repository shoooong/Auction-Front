import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SERVER_URL } from "api/serverApi";

import jwtAxios from "utils/jwtUtil";

const NoticeList = ({ activeTab }) => {
    const [notices, setNotices] = useState([]);
    const [luckyDraws, setLuckyDraws] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 한 페이지당 항목 수
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticesAndLuckyDraws = async () => {
            try {
                const response = await jwtAxios.get(
                    `${SERVER_URL}/user/combinedNoticeList`
                );
                const { notices, luckyDrawAnnouncements } = response.data;
                setNotices(notices);
                setLuckyDraws(luckyDrawAnnouncements);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notices and lucky draws:", error);
                setLoading(false);
            }
        };

        fetchNoticesAndLuckyDraws();
    }, []);

    // 페이지네이션에 따른 공지사항과 이벤트 공지 필터링
    const filteredNotices = notices.filter((notice) => {
        if (activeTab === "all") return true;
        return activeTab === "notice";
    });

    const filteredLuckyDraws = luckyDraws.filter((draw) => {
        if (activeTab === "all") return true;
        return activeTab === "event";
    });

    // 페이지네이션 적용
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedNotices = filteredNotices.slice(startIndex, endIndex);
    const paginatedLuckyDraws = filteredLuckyDraws.slice(startIndex, endIndex);

    if (loading) return <div>로딩 중...</div>;

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
                {paginatedNotices.length === 0 &&
                paginatedLuckyDraws.length === 0 ? (
                    <li>
                        <span className="title">
                            No notices or lucky draws available
                        </span>
                    </li>
                ) : (
                    [...paginatedNotices, ...paginatedLuckyDraws].map(
                        (item) => (
                            <li key={item.noticeId || item.luckyAnnouncementId}>
                                <Link
                                    to={`/service/notice/${
                                        item.noticeId
                                            ? `notice/${item.noticeId}`
                                            : `event/${item.luckyAnnouncementId}`
                                    }?tab=${activeTab}`}
                                >
                                    <div>
                                        <span className="title">
                                            {item.noticeTitle ||
                                                item.luckyTitle}
                                        </span>
                                        <span className="content">
                                            {item.noticeTitle
                                                ? "일반공지"
                                                : "이벤트 공지"}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        )
                    )
                )}
            </ul>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                <span>
                    페이지 {currentPage} / {totalPages}
                </span>
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

export default NoticeList;
