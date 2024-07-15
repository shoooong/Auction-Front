import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil'; 
import FeedBookmarksList from './FeedBookmarkList';

const FeedBookmarkContainer = () => {
  const [feedBookmarks, setFeedBookmarks] = useState([]);

  useEffect(() => {
    const fetchFeedBookmarks = async () => {
      try {
        const response = await jwtAxios.get('http://localhost:80/feed/feedBookmark');
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setFeedBookmarks(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setFeedBookmarks([response.data]);
        } else {
          console.error('Error: response data is not in expected format', response.data);
          setFeedBookmarks([]);
        }
      } catch (error) {
        console.error('Error fetching feed bookmarks:', error);
        setFeedBookmarks([]);
      }
    };

    fetchFeedBookmarks();
  }, []);

  return <FeedBookmarksList feedBookmarks={feedBookmarks} />;
};

export default FeedBookmarkContainer;
