import React from 'react';
import PostList from './PostList';
import StyleRegistration from './StyleRegistration'
import '../../styles/stylefeed.css';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">PUSH</h1>
        <nav className="nav">
          <a href="#">HOME</a>
          <a href="#">SHOP</a>
          <a href="#">STYLE</a>
        </nav>
      </header>
      <PostList />
      <StyleRegistration />
    </div>
  );
};

export default App;
