import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { Link } from 'react-router-dom'; // Link 추가
import '../../styles/postlist.css'

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:80/feed/feedList');
        const data = response.data.map(post => ({
          id: post.feedId,
          username: post.userId ? `User ${post.userId}` : 'Unknown',
          image: post.feedImage,
          description: post.feedTitle,
          likes: post.likeCount
        }));
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map(post => (
        <Link key={post.id} to={`/style/styledetail/${post.id}`}> {}
          <Post
            username={post.username}
            image={post.image}
            description={post.description}
            likes={post.likes}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
