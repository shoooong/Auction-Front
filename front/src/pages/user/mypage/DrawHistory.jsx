import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StatusDisplay } from "../mypageUtil";
import { getDrawHistory } from "api/user/mypageApi";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";

const DrawHistory = () => {
    const [drawHistory, setDrawHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDrawHistory();
                setDrawHistory(response);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="full-container">
            <div className="detail-history-title">
            <h2 className="title">응모 내역</h2>
            </div>
            <div className="draw-summary">
                <div>전체 <span>{drawHistory.allCount}</span></div>
                <div>진행 중 <span>{drawHistory.processCount}</span></div>
                <div>당첨 <span>{drawHistory.luckyCount}</span></div>
            </div>
                {drawHistory.drawDetails.length > 0 ? (
                    drawHistory.drawDetails.map((draw, index) => (
                        <div className="draw-item" key={index}>
                            <img src={`${CLOUD_STORAGE_BASE_URL}/luckydraw${draw.luckyImg}`} alt={draw.luckyName} />
                            <div>
                                <p className="draw-name" data-full-text={draw.luckyName}>{draw.luckyName}</p>
                                <p>{draw.luckySize}</p>
                            </div>
                            <p className="draw-date">{formatDate(draw.luckyDate)}</p>
                            <StatusDisplay status={draw.luckyStatus} />
                        </div>
                    ))
                ) : (
                    <p className="non-history">응모 내역이 없습니다.</p>
                )}
        </div>
    );
}

export default DrawHistory;