import React, { useEffect, useState } from 'react';
import AdminInquiryItemList from './AdminInquiryItemList';
import jwtAxios from '../../../pages/user/jwtUtil';
import { SERVER_URL } from '../../../api/serverApi';

const AdminInquiryListContainer = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await jwtAxios.get(`/api/admin/inquiryList`);
        setInquiries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };
    fetchInquiries();
  }, []);

  return <AdminInquiryItemList inquiries={inquiries} />;
};

export default AdminInquiryListContainer;