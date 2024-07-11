import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "pages/user/cookieUtil";
import { getDrawHistory } from "api/user/mypageApi";
import photo from "assets/images/myson.jpg";

const DrawHistory = () => {
    const [drawHistory, setDrawHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = getCookie("user");

            if (!userInfo || !userInfo.accessToken) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

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
        <div>
            <div className="history-title">
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
                            {/* <img src={draw.luckyImg} alt={draw.luckyName} /> */}
                            <img src={photo} alt="이앤톤" />
                            <div>
                                <p className="draw-name" data-full-text={draw.luckyName}>{draw.luckyName}</p>
                                <p>{draw.luckySize}</p>
                            </div>
                            <p className="draw-date">{formatDate(draw.luckyDate)}</p>
                            <p className="draw-status">{draw.luckyStatus}</p>
                        </div>
                    ))
                ) : (
                    <p className="non-history">응모 내역이 없습니다.</p>
                )}
        </div>
    );
}

export default DrawHistory;