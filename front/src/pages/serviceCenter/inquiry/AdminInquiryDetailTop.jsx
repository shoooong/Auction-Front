import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminInquiryDetail from './AdminInquiryDetail'

const AdminInquiryDetailPage = () => {
  const { inquiryId } = useParams();

  return (
    <div className="admin-inquiry-detail-page">
      
      <AdminInquiryDetail inquiryId={inquiryId} />
      
      <div className="navigation-buttons">
      </div>
    </div>
  );
};

export default AdminInquiryDetailPage;
