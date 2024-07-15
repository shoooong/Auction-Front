import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();  // 여기서는 그대로 'id'를 사용합니다.

  useEffect(() => {
    const fetchFeedDetail = async () => {
      try {
        // 여기서 'feedId'로 변경합니다.
        const response = await axios.get(`http://localhost:80/feed/styleFeed/${id}`);
        setFeed(response.data);
      } catch (error) {
        console.error('Error fetching feed details:', error);
        setError(error.response?.status === 404 ? 'Feed not found' : 'An error occurred');
      }
    };
    fetchFeedDetail();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!feed) return <div>Loading...</div>;

  return (
    <div className="feed-detail">
      <img src={feed.feedImage} alt={feed.feedTitle} className="feed-detail-image" />
      <div className="feed-detail-info">
        <h2>{feed.feedTitle}</h2>
        <p className="username">@{feed.userId ? `User ${feed.userId}` : 'Unknown'}</p>
        <p className="likes">❤️ {feed.likeCount}</p>
        <p className="description">{feed.feedContent}</p>
      </div>
    </div>
  );
};

export default FeedDetail;