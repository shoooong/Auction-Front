import React, { useState } from 'react';

import RequestProductForm from './RequestProductForm';
import RqquestProductWrapper from './RqquestProductWrapper';

const RequestProduct = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted ? (
        <RequestProductForm onSuccess={handleSuccess} />
      ) : (
        <RqquestProductWrapper />
      )}
    </div>
  );
};

export default RequestProduct;
