import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FeedDetail = () => {
  const { feedId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/feed/styleFeed/${feedId}`);
        const postData = {
          username: response.data.userId ? `User ${response.data.userId}` : 'Unknown',
          image: response.data.feedImage,
          description: response.data.feedTitle,
          likes: response.data.likeCount,
          details: response.data.details // 예: 상세 내용 필드
        };
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [feedId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed-detail">
      <h1>{post.username}</h1>
      <img src={post.image} alt={post.description} className="feed-detail-image" />
      <p>{post.description}</p>
      <p>Likes: {post.likes}</p>
      <p>{post.details}</p> {/* 추가적인 상세 내용 */}
    </div>
  );
};

export default FeedDetail;
