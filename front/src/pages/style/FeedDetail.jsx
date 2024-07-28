import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { SERVER_URL } from "api/serverApi";

import jwtAxios from 'utils/jwtUtil';

const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();

  const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/";

  useEffect(() => {
    const fetchFeedDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/styleFeed/${id}`);
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

  const handleLikeClick = async () => {
    try {
      const response = await jwtAxios.post(`/user/likeFeed/${id}`);
      if (response.status === 200) {
        setIsLiked(true);
        setFeed(prevFeed => ({
          ...prevFeed,
          likeCount: (prevFeed.likeCount || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await jwtAxios.post(`/user/saveFeedBookmark`, {
        feedId: id,
        feedImage: feed.feedImage,
        feedTitle: feed.feedTitle
      });
      if (response.status === 201) {
        setIsSaved(true);
      }
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
        <p className="username">{feed.nickName || 'Unknown'}</p> {/* Updated to display nickName */}
        <p className="likes">❤️ {feed.likeCount}</p>
        <p className="description">{feed.feedContent}</p>
        <button onClick={handleLikeClick} className="like-button">
          ❤️ {isLiked ? 'Liked' : 'Like'}
        </button>
        <button onClick={handleSaveClick} className="save-button">
          💾 {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default FeedDetail;
