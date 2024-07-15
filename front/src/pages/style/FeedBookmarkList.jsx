import React from 'react';

const FeedBookmarkList = ({ feedBookmarks }) => {
  return (
    <div>
      {feedBookmarks.length === 0 ? (
        <p>No feed bookmarks available.</p>
      ) : (
        <ul>
          {feedBookmarks.map((bookmark, index) => (
            <li key={index}>
              <p>User ID: {bookmark.userId}</p>
              <p>Feed ID: {bookmark.feedId}</p>
              <img src={bookmark.feedImage} alt="Feed" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedBookmarkList;
