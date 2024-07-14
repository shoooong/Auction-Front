import React from 'react';
import { Link } from 'react-router-dom';
import FeedList from './FeedList';
import '../../styles/stylefeed.css';

const Style = () => {
  return (
    <div className="style">
      <header>
        <h1>스타일 페이지</h1>
        <Link to="/style/register">
          <button className="register-button">스타일 등록하기</button>
        </Link>
      </header>
      <FeedList />
    </div>
  );
};

export default Style;
