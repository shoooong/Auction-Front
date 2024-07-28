import React from "react";
import { Link } from "react-router-dom";

import FeedList from "./FeedList";

const Style = () => {
    return (
        <div className="container">
            <div className="sub-nav">
                <Link to="/style">피드</Link>
                <Link to="/style/rank">랭킹</Link>
                <Link to="/style/register">스타일 등록하기</Link>
            </div>
            <FeedList />
        </div>
    );
};

export default Style;
