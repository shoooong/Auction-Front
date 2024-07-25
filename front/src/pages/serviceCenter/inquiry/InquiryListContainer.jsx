import React, { useEffect, useState } from 'react';
import InquiryItemList from './InquiryItemList';
import jwtAxios from '../../../pages/user/jwtUtil';
import { SERVER_URL } from '../../../api/serverApi';

const InquiryListContainer = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await jwtAxios.get(`/api/inquiryList`);
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
