import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Button } from "@mui/material";
import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";

import { getCookie } from 'pages/user/cookieUtil';

const LuckyDrawDetail = () => {
    const { luckyId } = useParams();
    const [luckyDraw, setLuckyDraw] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [like, setLike] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLuckyDraw = async () => {
            try {
                const response = await axios.get(`/luckydraw/${luckyId}`);
                console.log('Response data:', response.data);
                setLuckyDraw(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLuckyDraw();
    }, [luckyId]);

    const handleEnterClick = async () => {
        try {
            const userInfo = getCookie("user");
            const {accessToken} = userInfo;

            const response = await axios.post(`/luckydraw/${luckyId}/enter`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log('Enter response:', response.data);
            alert('응모가 완료되었습니다.');
            navigate("/luckydraw");
        } catch (error) {
            setError('응모 중 오류가 발생했습니다.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const optionsDate = { month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

        const formattedDate = date.toLocaleDateString('ko-KR', optionsDate);
        const formattedTime = date.toLocaleTimeString('ko-KR', optionsTime);

        return `${formattedDate} ${formattedTime}`;
    };

    const startDate = luckyDraw ? formatDate(luckyDraw.luckyStartDate) : '';
    const endDate = luckyDraw ? formatDate(luckyDraw.luckyEndDate) : '';
    const luckyDate = luckyDraw ? formatDate(luckyDraw.luckyDate) : '';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <div className="detail-container">
                <div className='detail-img-box pos-sticky'>
                    <p>{luckyDraw.luckyImage}</p>
                </div>

                <div className='w50p'>
                    <h1 className='detail-title'>{luckyDraw.luckyName}</h1>
                    <p className='detail-content'>{luckyDraw.content}</p>
                    
                    <div>
                        <p className='banner'>남은 시간</p>
                    </div>

                    <div>
                        <Button className="btn btn-text apply-btn full-btn"
                                onClick={handleEnterClick}
                        >
                            응모하기
                        </Button>
                    </div>

                    <div>
                        <Button
                            className="btn full-btn border-btn align-center"
                            onClick={() => setLike((like) => !like)}
                        >
                            {like ? (
                                <span>
                                    <img src={BookmarkOn} alt="BookmarkOn" />
                                </span>
                            ) : (
                                <span>
                                    <img src={BookmarkOff} alt="BookmarkOff" />
                                </span>
                            )}
                            관심상품 <span>3,298</span>
                        </Button>
                    </div>

                    <div className='banner'>
                        <img src='kreamapp://exhibitions/5441' alt='이벤트 배너' />
                    </div>

                    <div className='data-container'>
                        <h5>응모 기간</h5>
                        <p>{startDate} ~ {endDate}</p>
                    </div>
                    <div className='data-container'>
                        <h5>당첨자 발표</h5>
                        <p>{luckyDate}</p>
                    </div>
                    <div className='data-container'>
                        <h5>당첨 인원</h5>
                        <p>{luckyDraw.luckyPeople}명</p>
                    </div>
                </div>
            </div>
         </div>
    );
};

export default LuckyDrawDetail;