import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FeedDetail = () => {
  const { feedId } = useParams();
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`http://localhost:80/feed/styleFeed/${feedId}`);
        const feedData = {
          username: response.data.userId ? `User ${response.data.userId}` : 'Unknown',
          image: response.data.feedImage,
          description: response.data.feedTitle,
          likes: response.data.likeCount,
          details: response.data.details
        };
        setFeed(feedData);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();
  }, [feedId]);

  if (!feed) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed-detail">
      <h1>{feed.username}</h1>
      <img src={feed.image} alt={feed.description} className="feed-detail-image" />
      <p>{feed.description}</p>
      <p>Likes: {feed.likes}</p>
      <p>{feed.details}</p> {}
    </div>
  );
};

export default FeedDetail;
