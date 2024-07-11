// src/components/NoticeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../styles/noticeList.css';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [activeTab] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:80/notice/noticeList')
            .then(response => {
                setNotices(response.data);
            })
            .catch(error => {
                console.error('Error fetching notices:', error);
            });
    }, []);

    const filteredNotices = notices.filter((notice) => {
        if (activeTab === 'all') {
            return true;
        } else {
            return notice.type === activeTab; // Adjust this line according to your filtering logic
        }
    });

    return (
        <section className="notice-list">
            <ul>
                {filteredNotices.length === 0 ? (
                    <>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] KREAM DRAW - 6월 3주차 서프라이즈, 신규회원 전용, KREAM 카드 전용 응모 안내
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">공지</span>
                            <span className="content">커뮤니티 가이드라인 변경 안내</span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] KREAM DRAW - 6월 2주차 서프라이즈, 6월 3주차 신규회원 전용, KREAM 카드 전용 응모 안내
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] DRAW - 오버듀플레어 응모
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">공지</span>
                            <span className="content">
                                스포츠 저지 마킹 상품 거래 중단 안내
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] DRAW - FAD 캣 키링 응모
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] Exclusive - ONE UNIVERSE FESTIVAL 2024 Blind Ticket 2-Day Pass (1+1) 응모
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] KREAM DRAW - 데일리 드로우 2주차 응모 안내
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] KREAM DRAW - 6월 2주차 신규회원 전용, KREAM 카드 전용 응모 안내
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="title">이벤트</span>
                            <span className="content">
                                <Link to="/service/noticedetail">
                                    [안내] KREAM DRAW - 데일리 드로우 1주차 응모
                                </Link>
                            </span>
                        </li>
                    </>
                ) : (
                    filteredNotices.map((notice, index) => (
                        <li key={index}>
                            <span className="title">{notice.noticeTitle}</span>
                            <span className="content">
                                <Link to={`/service/noticedetail/${notice.noticeId}`}>
                                    {notice.noticeContent}
                                </Link>
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

export default NoticeList;
