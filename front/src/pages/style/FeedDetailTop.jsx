import React from 'react';
import { useParams } from 'react-router-dom';

import FeedDetail from './FeedDetail';

const FeedDetailTop = () => {
  const { id } = useParams();
  
  if (!id) {
    return <div>404 Not Found</div>;
  }

  return <FeedDetail />;
};

export default FeedDetailTop;