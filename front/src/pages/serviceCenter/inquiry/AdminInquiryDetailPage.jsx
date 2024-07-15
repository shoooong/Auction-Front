import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminInquiryDetail from './AdminInquiryDetail';

const AdminInquiryDetailPage = () => {
  const { inquiryId } = useParams();

  return (
    <div className="admin-inquiry-detail-page">
      <h1>관리자 전용 1대1 문의 상세</h1>
      <AdminInquiryDetail inquiryId={inquiryId} />
    </div>
  );
};

export default AdminInquiryDetailPage;
