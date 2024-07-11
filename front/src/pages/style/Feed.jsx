import React from 'react';
import '../../styles/feed.css'

const Post = ({ username, image, description, likes }) => {
  return (
    <div className="feed">
      <img src={image} alt={description} className="feed-image" />
      <div className="feed-info">
        <span className="username">@{username}</span>
        <span className="likes">❤️ {likes}</span>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Post;
