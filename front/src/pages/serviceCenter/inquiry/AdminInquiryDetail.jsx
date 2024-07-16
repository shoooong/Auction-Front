import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil';
import { Link } from 'react-router-dom';

const AdminInquiryDetail = ({ inquiryId }) => {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const response = await jwtAxios.get(`http://localhost:80/inquiry/admin/${inquiryId}`);
        setInquiry(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching inquiry:', error);
        setError('Failed to load inquiry details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!inquiry) return <div>No inquiry found</div>;

  return (
    <div className="admin-inquiry-detail">
      <h2>관리자 전용 1대1 문의 상세</h2>
      <p><strong>ID:</strong> {inquiry.inquiryId}</p>
      <p><strong>제목:</strong> {inquiry.title}</p>
      <p><strong>작성자:</strong> {inquiry.userId}</p>
      <p><strong>작성일:</strong> {new Date(inquiry.createdDate).toLocaleString()}</p>
      <p><strong>상태:</strong> {inquiry.response ? '답변 완료' : '답변 대기'}</p>
      <p><strong>내용:</strong> {inquiry.content}</p>
      {/* 필요에 따라 추가 필드 표시 가능 */}
      <div className="navigation-buttons">
        <Link to="/service/admininquiry" className="back-button">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default AdminInquiryDetail;
