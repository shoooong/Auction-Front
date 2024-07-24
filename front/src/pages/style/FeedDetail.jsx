import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwtAxios from 'pages/user/jwtUtil';
import { SERVER_URL } from "api/serverApi";

const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();

  const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/";

  useEffect(() => {
    const fetchFeedDetail = async () => {
      try {
        const response = await jwtAxios.get(`${SERVER_URL}/feed/styleFeed/${id}`);
        const feedData = response.data;
        feedData.feedImage = `${CLOUD_STORAGE_BASE_URL}${feedData.feedImage}`;
        setFeed(feedData);
      } catch (error) {
        console.error('Error fetching feed details:', error);
        setError(error.response?.status === 404 ? 'Feed not found' : 'An error occurred');
      }
    };
    fetchFeedDetail();
  }, [id]);

  const handleSave = async () => {
    try {
      await jwtAxios.post(`${SERVER_URL}/feed/user/saveFeedBookmark`, { feedId: id });
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error saving feed:', error);
    }
  };

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
        <button onClick={handleSave} className="save-button">
          {isSaved ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
          {isSaved ? ' Saved' : ' Save'}
        </button>
      </div>
    </div>
  );
};

export default FeedDetail;
