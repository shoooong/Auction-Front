import React from 'react';
import { useParams, Link } from 'react-router-dom';
import FeedDetail from './FeedDetail';

const FeedDetailTop = () => {
  const { id } = useParams();

  if (!id) {
    return <div>404 Not Found</div>;
  }

  return (
    <div>
      <Link to="/style">
        &lt; {}
      </Link>
      <FeedDetail />
    </div>
  );
};

export default FeedDetailTop;
