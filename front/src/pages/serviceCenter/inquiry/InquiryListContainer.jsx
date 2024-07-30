import React, { useEffect, useState } from 'react';

import jwtAxios from 'utils/jwtUtil';

import InquiryItemList from './InquiryItemList';


const InquiryListContainer = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await jwtAxios.get(`/inquiryList`);
        setInquiries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  return <InquiryItemList inquiries={inquiries} />;
};

export default InquiryListContainer;
