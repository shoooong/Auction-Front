import React from 'react';
import { useNavigate } from 'react-router-dom';

import useLuckyDraw from "hooks/useLuckyDraw";

import { Button } from "@mui/material";



const LuckyDraw = () => {
    const { drawItems, loading, error } = useLuckyDraw();
    const navigate = useNavigate();

    const handleApplyClick = (luckyId) => {
        navigate(`/luckydraw/${luckyId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="column-direction align-center">
            <h1>Lucky</h1>
            <h1>Draw</h1>

            {drawItems.map(item => (
                <div className="product column-direction align-center" key={item.luckyId}>
                        <div>
                            <p>{item.luckyImage}</p>
                        </div>
                        <h2>{item.luckyName}</h2>
                        <p>{item.content}</p>
                        <Button 
                            className="btn btn-text apply-btn"
                            onClick={() => handleApplyClick(item.luckyId)}>
                            응모하기
                        </Button>
                </div>
            ))}

        </div>
    );
}

export default LuckyDraw;