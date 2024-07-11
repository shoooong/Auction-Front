import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/styleregistration.css';

const FeedRegistrationForm = () => {
  const [feedTitle, setFeedTitle] = useState('');
  const [feedImage, setFeedImage] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newFeed = {
      feedTitle,
      feedImage,
      userId: parseInt(userId),
    };

    try {
      const response = await axios.post('http://localhost:80/feed/user/feedRegistration', newFeed, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Feed registered successfully:', response.data);
      setFeedTitle('');
      setFeedImage('');
      setUserId('');
    } catch (error) {
      if (error.response) {

        console.error('Error response:', error.response.data);
    
        console.error('Status code:', error.response.status);

      } else if (error.request) {

        console.error('No response received:', error.request);

      } else {
        
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <form className="feed-registration-form" onSubmit={handleSubmit}>
      <h2>피드 등록</h2>
      <div className="form-group">
        <label htmlFor="feedTitle">피드 제목:</label>
        <input
          type="text"
          id="feedTitle"
          value={feedTitle}
          onChange={(e) => setFeedTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="feedImage">피드 이미지 URL:</label>
        <input
          type="text"
          id="feedImage"
          value={feedImage}
          onChange={(e) => setFeedImage(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="userId">사용자 ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
};

export default FeedRegistrationForm;