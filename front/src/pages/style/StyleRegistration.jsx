import React, { useState } from 'react';
import jwtAxios from 'pages/user/jwtUtil'; 
import {SERVER_URL} from "../../api/serverApi";

const FeedRegistrationForm = () => {
  const [feedTitle, setFeedTitle] = useState('');
  const [feedImage, setFeedImage] = useState(null);
  const [userId, setUserId] = useState('');

  const handleImageChange = (event) => {
    setFeedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('feedTitle', feedTitle);
    formData.append('feedImage', feedImage);
    formData.append('userId', userId);

    try {
      const response = await jwtAxios.post(`${SERVER_URL}/feed/user/feedRegistration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Feed registered successfully:', response.data);
      setFeedTitle('');
      setFeedImage(null);
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
        <label htmlFor="feedImage">피드 이미지:</label>
        <input
          type="file"
          id="feedImage"
          onChange={handleImageChange}
          accept="image/*"
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