import React from 'react';
import FeedList from './FeedList';
import StyleRegistration from './StyleRegistration'
import '../../styles/stylefeed.css';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <a href="#">HOME</a>
          <a href="#">SHOP</a>
          <a href="#">STYLE</a>
        </nav>
      </header>
      <FeedList />
      <StyleRegistration />
    </div>
  );
};

export default App;
