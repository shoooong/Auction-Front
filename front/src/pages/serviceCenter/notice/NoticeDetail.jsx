import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NoticeDetailContainer from "./NoticeDetailContainer";

const NoticeDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab") || "all"; // 현재 탭 정보 가져오기, 기본값 "all"

    const handleBack = () => {
        navigate(`/service/notice?tab=${tab}`);
    };

    return (
        <div className="notice-detail-page">
            <button onClick={handleBack}>목록으로 돌아가기</button>
            <NoticeDetailContainer />
        </div>
    );
};

export default NoticeDetail;
