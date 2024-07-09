import React from 'react';
import { useNavigate } from 'react-router-dom';

import useLuckyDraw from "hooks/useLuckyDraw";

import { Button } from "@mui/material";

import "styles/luckydraw.css";



const LuckyDraw = () => {
    const { drawItems, loading, error } = useLuckyDraw();
    const navigate = useNavigate();

    const handleApplyClick = (luckyId) => {
        navigate(`/luckydraw/${luckyId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='column-direction align-center'>
            <div className='title-container'>
                <p className='lucky-draw'>LUCKY<br/>DRAW</p>
                <p className='title1'>놓칠 수 없는 당첨 기회!</p>
                <p className='title2'>드로우는 1번만 응모 가능하며, 당첨자 발표일에 공지사항에서 결과 확인 가능합니다.</p>
            </div>
            

            {drawItems.map(item => (
                <div key={item.luckyId} className='column-direction align-center'>
                        <div className='img-box'>
                            <p>{item.luckyImage}</p>
                        </div>

                        <h2 className='title'>{item.luckyName}</h2>
                        <p className='content'>{item.content}</p>
                        <Button 
                            className='btn btn-text apply-btn full-btn' 
                            onClick={() => handleApplyClick(item.luckyId)}>
                            응모하기
                        </Button>
                </div>
            ))}

        </div>
    );
}

export default LuckyDraw;