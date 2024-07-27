import React from 'react';
import AdminInquiryListContainer from './AdminInquiryListContainer';

const AdminInquiryPage = () => {
  return (
    <div className="admin-inquiry-page">
      <h1>관리자 1대1 문의 조회</h1>
      <AdminInquiryListContainer />
    </div>
  );
};

export default AdminInquiryPage;