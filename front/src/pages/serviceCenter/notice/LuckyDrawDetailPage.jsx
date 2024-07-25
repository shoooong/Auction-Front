import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../api/serverApi";

const LuckyDrawDetailPage = () => {
    const { luckyAnnouncementId } = useParams();
    const [luckyDraw, setLuckyDraw] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLuckyDraw = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/luckyDrawAnnouncement/${luckyAnnouncementId}`);
                setLuckyDraw(response.data);
                setLoading(false);
            } catch (err) {
                setError("이벤트 공지사항을 불러오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchLuckyDraw();
    }, [luckyAnnouncementId]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!luckyDraw) return <div>이벤트 공지사항을 찾을 수 없습니다.</div>;

    return (
        <div className="lucky-draw-detail">
            <h2>{luckyDraw.luckyTitle}</h2>
            <p>{luckyDraw.createDate}</p>
            <div className="content">{luckyDraw.luckyContent}</div>
        </div>
    );
};

export default LuckyDrawDetailPage;
