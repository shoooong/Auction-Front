// AdminInquiryDetailPage.js

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminInquiryDetail from './AdminInquiryDetail'

const AdminInquiryDetailPage = () => {
  const { inquiryId } = useParams();

  return (
    <div className="admin-inquiry-detail-page">
      <h1>관리자용 1:1 문의 상세</h1>
      
      <AdminInquiryDetail inquiryId={inquiryId} />
      
      <div className="navigation-buttons">
        <Link to="/admin/inquiries" className="back-button">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default AdminInquiryDetailPage;
