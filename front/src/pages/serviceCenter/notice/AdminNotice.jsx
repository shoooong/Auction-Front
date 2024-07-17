import React from 'react'
import { Link } from 'react-router-dom';
import AdminNoticeList from './AdminNoticeList';
import NoticeTab from './NoitceTab';

const AdminNotice = () => {
  return (
    <div className="app-container">
      <div className="content-container">
        <NoticeTab />
        <Link to="/admin/notice/register" className="create-notice-btn">
          공지사항 등록하기
        </Link>
        <AdminNoticeList />
      </div>
    </div>
  );
};

export default AdminNotice;