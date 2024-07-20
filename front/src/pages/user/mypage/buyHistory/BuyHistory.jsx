import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";
import { getCookie } from "pages/user/cookieUtil";
import { getAllBuyHistory } from "api/user/mypageApi";
import { formatPrice, getStatusText } from "pages/user/mypageUtil";
import BuyHistoryProcess from "./BuyHistoryProcess";
import BuyHistoryComplete from "./BuyHistoryComplete";
import photo from "assets/images/myson.jpg";

export default function BuyHistory() {
    const [buyHistory, setBuyHistory] = useState(null);
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
                const response = await getAllBuyHistory();
                setBuyHistory(response);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    

    return (
        <div>
            <div className="history-title">
            <h2 className="title">구매 내역</h2>
            </div>
            <div>
                <div className="mypage-tab buying">
                    <Tabs defaultValue={1}>
                        <TabsList>
                            <Tab value={1}>
                                <span>{buyHistory.allCount}</span>
                                <b>전체</b>
                            </Tab>
                            <Tab value={2}>
                                <span>{buyHistory.processCount}</span>
                                <b>입찰 중</b>
                            </Tab>
                            <Tab value={3}>
                                <span>{buyHistory.completeCount}</span>
                                <b>종료</b>
                            </Tab>
                        </TabsList>
                        <TabPanel value={1}>
                            {buyHistory.buyingDetails.length > 0 ? (
                                buyHistory.buyingDetails.map((buy, index) => (
                                    <div className="buy-item" key={index}>
                                        {/* <img src={buy.productImg} alt={buy.productName} /> */}
                                        <img src={photo} alt="이앤톤" />
                                        <div>
                                            <p>{buy.productName}</p>
                                            <p>{buy.productSize}</p>
                                        </div>
                                        <p>{formatPrice(buy.orderPrice)}원</p>
                                        <p>{getStatusText(buy.orderStatus)}</p>
                                    </div>
                                 ))
                            ) : (
                                <p className="non-history">구매 내역이 없습니다.</p>
                            )}
                        </TabPanel>
                        <TabPanel value={2}><BuyHistoryProcess /></TabPanel>
                        <TabPanel value={3}><BuyHistoryComplete /></TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}