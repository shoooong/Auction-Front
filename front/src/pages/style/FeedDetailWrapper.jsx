import React from 'react';
import FeedDetail from './StyleDetail'

const FeedDetailWrapper = ({ feedId }) => {
  return (
    <div className="feed-detail-wrapper">
      <FeedDetail feedId={feedId} />
    </div>
  );
};

export default FeedDetailWrapper;
