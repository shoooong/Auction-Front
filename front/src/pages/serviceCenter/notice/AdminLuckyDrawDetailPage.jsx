import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import jwtAxios from "utils/jwtUtil";

const LuckyDrawDetailPage = () => {
    const { luckyAnnouncementId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab") || "all"; // 현재 탭 상태 가져오기
    const [luckyDraw, setLuckyDraw] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        luckyTitle: "",
        luckyContent: ""
    });

    useEffect(() => {
        const fetchLuckyDraw = async () => {
            try {
                const response = await jwtAxios.get(`/admin/luckyDrawAnnouncement/${luckyAnnouncementId}`);
                setLuckyDraw(response.data);
                setFormData({
                    luckyTitle: response.data.luckyTitle,
                    luckyContent: response.data.luckyContent
                });
                setLoading(false);
            } catch (err) {
                setError("이벤트 공지사항을 불러오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchLuckyDraw();
    }, [luckyAnnouncementId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            await jwtAxios.put(`/admin/luckyDrawAnnouncement/${luckyAnnouncementId}`, formData);
            setLuckyDraw(formData);
            setIsEditing(false);
        } catch (error) {
            setError("이벤트 공지사항을 수정하는 데 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 이벤트 공지사항을 삭제하시겠습니까?")) {
            try {
                await jwtAxios.delete(`/admin/luckyDrawAnnouncement/${luckyAnnouncementId}`);
                navigate(`/admin/notice?tab=${tab}`); // 탭 상태를 유지하면서 목록으로 이동
            } catch (error) {
                setError("이벤트 공지사항을 삭제하는 데 실패했습니다.");
            }
        }
    };

    const handleBackToList = () => {
        navigate(`/admin/notice?tab=${tab}`); // 탭 상태를 유지하면서 목록으로 이동
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!luckyDraw) return <div>이벤트 공지사항을 찾을 수 없습니다.</div>;

    return (
        <div className="lucky-draw-detail">
            {isEditing ? (
                <div>
                    <h2>이벤트 공지사항 수정</h2>
                    <input
                        type="text"
                        name="luckyTitle"
                        value={formData.luckyTitle}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="luckyContent"
                        value={formData.luckyContent}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleEditToggle}>취소</button>
                </div>
            ) : (
                <div>
                    <h2>{luckyDraw.luckyTitle}</h2>
                    <p>{luckyDraw.createDate}</p>
                    <div className="content">{luckyDraw.luckyContent}</div>
                    <button onClick={handleEditToggle}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
            <button onClick={handleBackToList}>목록으로 이동</button>
        </div>
    );
};

export default LuckyDrawDetailPage;
