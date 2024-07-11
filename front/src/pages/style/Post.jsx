import React from 'react';
import '../../styles/post.css'

const Post = ({ username, image, description, likes }) => {
  return (
    <div className="post">
      <img src={image} alt={description} className="post-image" />
      <div className="post-info">
        <span className="username">@{username}</span>
        <span className="likes">❤️ {likes}</span>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Post;
