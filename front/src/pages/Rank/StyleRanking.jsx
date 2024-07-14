import React from 'react';
import StyleRankingList from './StyleRankingList';
import '../../styles/stylefeed.css';

const StyleRanking = () => {
  return (
    <div className="style">
      <header>
        <h1>스타일 페이지</h1>
      </header>
      <StyleRankingList />
    </div>
  );
};

export default StyleRanking;
