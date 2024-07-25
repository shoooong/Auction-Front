import React, { useState } from "react";
import jwtAxios from "../../../pages/user/jwtUtil";
import { useNavigate } from "react-router-dom";

const LuckyDrawRegister = () => {
    const [luckyTitle, setLuckyTitle] = useState("");
    const [luckyContent, setLuckyContent] = useState("");
    const [luckyId, setLuckyId] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await jwtAxios.post(`/announcementRegistration`, {
                luckyTitle,
                luckyContent,
                luckyId,
            });
            console.log("이벤트 공지사항 등록 성공:", response.data);
            navigate("/admin/notice");
        } catch (err) {
            console.error("이벤트 공지사항 등록 실패:", err);
            setError("이벤트 공지사항 등록에 실패했습니다.");
        }
    };

    return (
        <div className="create-lucky-draw-announcement">
            <h2>이벤트 공지사항 등록</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="luckyTitle">제목</label>
                    <input
                        type="text"
                        id="luckyTitle"
                        value={luckyTitle}
                        onChange={(e) => setLuckyTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="luckyContent">내용</label>
                    <textarea
                        id="luckyContent"
                        value={luckyContent}
                        onChange={(e) => setLuckyContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="luckyId">Lucky Draw ID</label>
                    <input
                        type="text"
                        id="luckyId"
                        value={luckyId}
                        onChange={(e) => setLuckyId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default LuckyDrawRegister;
