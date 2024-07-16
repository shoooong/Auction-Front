import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NoticeDetailContent from './NoticeDetailContent';

const NoticeDetailContainer = () => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noticeId } = useParams();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:80/notice/notice/${noticeId}`);
        setNotice(response.data);
        setLoading(false);
      } catch (err) {
        setError('공지사항을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return <NoticeDetailContent notice={notice} />;
};

export default NoticeDetailContainer;