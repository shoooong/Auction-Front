import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../styles/noticeList.css';

const AdminNoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [activeTab] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:80/notice/admin/noticeList')
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

  return (
    <section className="notice-list">
      <ul>
        {filteredNotices.length === 0 ? (
          <li>
            <span className="title">No notices available</span>
          </li>
        ) : (
          filteredNotices.map((notice, index) => (
            <li key={index}>
              <span className="title">{notice.noticeTitle}</span>
              <span className="content">
                <Link to={`/service/adminnotice/${notice.noticeId}`}>
                  {notice.noticeContent}
                </Link>
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default AdminNoticeList;