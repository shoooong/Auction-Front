import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

import { getCookie } from 'pages/user/cookieUtil';
import { getLuckyDrawDetail, enterLuckyDraw } from 'api/luckydrawApi';

const LuckyDrawDetail = () => {
    const { luckyId } = useParams();
    const [luckyDraw, setLuckyDraw] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLuckyDraw = async () => {
            try {
                const data = await getLuckyDrawDetail(luckyId);
                console.log('Response data:', data);
                setLuckyDraw(data);
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
            // const userInfo = getCookie("user");

            // if (!userInfo || !userInfo.accessToken) {
            //     alert('로그인이 필요한 서비스입니다.');
            //     navigate('/user/login');
            //     return;
            // }

            const data = await enterLuckyDraw(luckyId);
            console.log('Enter response:', data);

            alert('응모가 완료되었습니다.');
            navigate("/luckydraw");
        } catch (error) {
            setError('응모 중 오류가 발생했습니다.');
            // alert(error.message);
            // navigate(0);
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

    useEffect(() => {
        if (luckyDraw) {
            const endDate = new Date(luckyDraw.luckyEndDate);
            const updateRemainingTime = () => {
                const now = new Date();
                const timeDiff = endDate - now;

                if (timeDiff <= 0) {
                    setRemainingTime("00<span class='colon'>:</span>00<span class='colon'>:</span>00<span class='colon'>:</span>00");
                } else {
                    const days = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
                    const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                    const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
                    const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');
                    setRemainingTime(
                        `${days}<span class='colon'>:</span>${hours}<span class='colon'>:</span>${minutes}<span class='colon'>:</span>${seconds}`
                    );
                }
            };

            updateRemainingTime();
            const intervalId = setInterval(updateRemainingTime, 1000);

            return () => clearInterval(intervalId);
        }
    }, [luckyDraw]);

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
                    
                    <div className='time-container'>
                        <p className='time' dangerouslySetInnerHTML={{ __html: remainingTime }}></p>
                    </div>

                    <div>
                        <Button className="btn btn-text apply-btn full-btn"
                                onClick={handleEnterClick}
                        >
                            응모하기
                        </Button>
                    </div>

                    <div className='banner'>
                        <img src='' alt='이벤트 배너' />
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

            <div className='cautions'>
                <p>유의 사항</p>
                <ul>
                    <li>본 이벤트는 PUSH 7월 신규회원 대상 앱 전용 이벤트입니다. (24년 7월 1일 이후 가입 회원 대상)</li>
                    <li>광고성 정보 수신 설정(앱푸시, 문자, 메일)에 모두 동의해야 응모 참여 가능합니다.</li>
                    <li>응모 이벤트 참여 완료는 마이페이지 응모내역에서 확인 가능합니다.</li>
                    <li>당첨자에 한하여 거래 체결 관련 개별 메시지를 발송 드리며, 미당첨자에게는 별도의 연락을 드리지 않습니다.</li>
                    <li>당첨자에게 서류 요청 후, 72시간 내에 회신이 없으면 당첨이 자동 취소되며, 재추첨은 진행되지 않습니다.</li>
                    <li>제세공과금은 PUSH에서 부담하며, 제세공과금 처리를 위해 가입하신 이메일 주소로 신분증 등 서류를 요청드립니다.</li>
                    <li>회원정보가 일치하지 않거나 부당한 방법으로 응모한 고객의 경우 당첨이 자동 취소되며, 및 추후 이벤트 응모 시 불이익을 받을 수 있습니다.</li>
                    <li>경품은 랜덤으로 지급되며, 교환 및 환불이 불가능합니다.</li>
                    <li>일부 제품은 출시 연기 및 수급 상황에 따라 배송이 늦어질 수 있습니다.</li>
                </ul>
            </div>
         </div>
    );
};

export default LuckyDrawDetail;