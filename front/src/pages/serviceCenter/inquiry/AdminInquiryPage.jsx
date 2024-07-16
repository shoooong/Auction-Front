import React from 'react';
import { Link } from 'react-router-dom';
import AdminInquiryListContainer from './AdminInquiryListContainer';

const AdminInquiryPage = () => {
  return (
    <div className="admin-inquiry-page">
      <h1>관리자 1대1 문의 조회</h1>
      <AdminInquiryListContainer />
      <nav className="bottom-nav">
        <Link to="/admin/home" className="nav-item">Admin Home</Link>
        <Link to="/admin/users" className="nav-item">Users</Link>
        <Link to="/admin/products" className="nav-item">Products</Link>
        <Link to="/admin/inquiries" className="nav-item">Inquiries</Link>
      </nav>
    </div>
  );
};

export default AdminInquiryPage;