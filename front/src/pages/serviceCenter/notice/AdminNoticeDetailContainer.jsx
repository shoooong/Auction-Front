import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NoticeDetailContent from './NoticeDetailContent';
import NoticeEditForm from './NoticeEditForm';

const AdminNoticeDetailContainer = () => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tab = query.get("tab") || "all"; // 현재 탭 상태 가져오기

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await jwtAxios.get(`/admin/notice/${noticeId}`);
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
    setIsEditing(true);
  };

  const handleUpdate = async (updatedNotice) => {
    try {
      const response = await jwtAxios.put(`/admin/notice/${noticeId}`, updatedNotice);
      setNotice(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('공지사항 수정 실패:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        await jwtAxios.delete(`/admin/notice/${noticeId}`);
        navigate(`/admin/notice?tab=${tab}`); // 기존 탭으로 이동
      } catch (err) {
        console.error('공지사항 삭제 실패:', err);
      }
    }
  };

  const handleBackToList = () => {
    navigate(`/admin/notice?tab=${tab}`); // 기존 탭으로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="admin-notice-detail-container">
      {isEditing ? (
        <NoticeEditForm
          notice={notice}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <NoticeDetailContent
          notice={notice}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <button onClick={handleBackToList}>목록으로 이동</button>
    </div>
  );
};

export default AdminNoticeDetailContainer;
