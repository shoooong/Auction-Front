import React from "react";
import { Link } from "react-router-dom";

import StyleRankingList from "./StyleRankingList";

const StyleRanking = () => {
    return (

        
        <div className="style">
            <header>
                <h1>스타일 랭킹</h1>
            </header>
            <div className="sub-nav">
                <Link to="/style">피드</Link>
                <Link to="/style/rank">랭킹</Link>
                <Link to="/style/register">스타일 등록하기</Link>
            </div>
            <StyleRankingList />
        </div>
    );
};

export default StyleRanking;
