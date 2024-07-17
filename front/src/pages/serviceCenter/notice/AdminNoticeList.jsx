import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/noticeList.css';
import { SERVER_URL } from '../../../api/serverApi';
import CommonList from '../../../pages/admin/layout/CommonList';

const AdminNoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [activeTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${SERVER_URL}/notice/admin/noticeList`)
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const filteredNotices = notices.filter((notice) => {
    if (activeTab === 'all') {
      return true;
    } else {
      return notice.type === activeTab;
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'noticeTitle', headerName: 'Title', width: 250 },
    { field: 'noticeContent', headerName: 'Content', width: 400 },
    { field: 'createDate', headerName: 'Create Date', width: 200 },
  ];

  const rows = filteredNotices.map(notice => ({
    id: notice.noticeId,
    noticeTitle: notice.noticeTitle,
    noticeContent: notice.noticeContent,
    createDate: new Date(notice.createDate).toLocaleString(),
  }));

  const handleRowClick = (row) => {
    navigate(`/admin/notice/${row.id}`);
  };

  return (
    <section className="notice-list">
      <CommonList rows={rows} columns={columns} onRowClick={handleRowClick} />
    </section>
  );
};

export default AdminNoticeList;
