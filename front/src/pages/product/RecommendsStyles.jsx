import React from 'react';
import "../../styles/product.css";  // 필요한 스타일을 여기에 추가합니다.
import tempImg1 from "../../assets/images/feed4.png";
import tempImg2 from "../../assets/images/feed5.png";
import tempImg3 from "../../assets/images/feed6.png";
import tempImg4 from "../../assets/images/feed1.png";
import tempImg5 from "../../assets/images/feed2.png";
import tempImg6 from "../../assets/images/feed3.png";

import {Box} from "@mui/material";

const RecommendedStyles = () => {
    const styles = [
        { id: 1, imgSrc: tempImg1, label: "Style 1" },
        { id: 2, imgSrc: tempImg2, label: "Style 2" },
        { id: 3, imgSrc: tempImg3, label: "Style 3" },
        { id: 4, imgSrc: tempImg4, label: "Style 4" },
        { id: 5, imgSrc: tempImg5, label: "Style 5" },
        { id: 6, imgSrc: tempImg6, label: "Style 6" },
    ];

    return (
        <div className="recommended-styles-container">
            <Box className="box">
                <Box className="product-title-box">
                    <h2 className="product-title">인기 아이템을 활용한 추천 스타일</h2>
                    <div className="recommended-styles-grid">
                        {styles.map((style) => (
                            <div key={style.id} className="recommended-style">
                                <img src={style.imgSrc} alt={style.label} className="recommended-style-img" />
                                <p className="recommended-style-label">{style.label}</p>
                            </div>
                        ))}
                    </div>

                </Box>
            </Box>
            
        </div>
    );
};

export default RecommendedStyles;
