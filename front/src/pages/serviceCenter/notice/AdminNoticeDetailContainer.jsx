import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NoticeDetailContent from './NoticeDetailContent';
import NoticeEditForm from './NoticeEditForm';

const AdminNoticeDetailContainer = () => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { noticeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:80/notice/admin/notice/${noticeId}`);
        setNotice(response.data);
        setLoading(false);
      } catch (err) {
        setError('공지사항을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  const handleEdit = () => {
    console.log('Edit button clicked');
    setIsEditing(true);
  };

  const handleUpdate = async (updatedNotice) => {
    console.log('Updating notice:', updatedNotice);
    try {
      const response = await axios.put(`http://localhost:80/notice/user/modifyNotice/${noticeId}`, updatedNotice);
      console.log('Update response:', response.data);
      setNotice(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('공지사항 수정 실패:', err);
    }
  };

  const handleDelete = async () => {
    console.log('Delete button clicked');
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:80/notice/user/deleteNotice/${noticeId}`);
        console.log('Notice deleted successfully');
        navigate('/admin/notices'); // 삭제 후 목록 페이지로 이동
      } catch (err) {
        console.error('공지사항 삭제 실패:', err);
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return isEditing ? (
    <NoticeEditForm notice={notice} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />
  ) : (
    <NoticeDetailContent notice={notice} onEdit={handleEdit} onDelete={handleDelete} />
  );
};

export default AdminNoticeDetailContainer;