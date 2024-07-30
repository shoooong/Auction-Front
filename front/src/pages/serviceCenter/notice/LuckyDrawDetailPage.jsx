import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

const LuckyDrawDetailPage = () => {
    const { luckyAnnouncementId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab") || "all"; // 기본값은 "all"

    const [luckyDraw, setLuckyDraw] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLuckyDraw = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/luckyDrawAnnouncement/${luckyAnnouncementId}`
                );
                setLuckyDraw(response.data);
                setLoading(false);
            } catch (err) {
                setError("이벤트 공지사항을 불러오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchLuckyDraw();
    }, [luckyAnnouncementId]);

    const handleBack = () => {
        // 목록 페이지로 돌아갈 때 탭 정보 유지
        navigate(`/service/notice?tab=${tab}`);
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!luckyDraw) return <div>이벤트 공지사항을 찾을 수 없습니다.</div>;

    return (
        <div className="notice-detail-page">
            <div className="notice-detail-content">
                <div className="align-center space-bewteen">
                    <h2>{luckyDraw.luckyTitle}</h2>
                    <span>{luckyDraw.createDate}</span>
                </div>
                <div className="content">{luckyDraw.luckyContent}</div>
                <div className="text-center">
                    <button className="add-btn btn" onClick={handleBack}>
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LuckyDrawDetailPage;
