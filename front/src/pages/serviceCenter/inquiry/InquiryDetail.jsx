import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil';
import { SERVER_URL } from '../../../api/serverApi';

const InquiryDetail = ({ inquiryId }) => {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const response = await jwtAxios.get(`${SERVER_URL}/inquiry/${inquiryId}`);
        console.log('API Response:', response.data); // 전체 응답 데이터 로깅
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

  // 데이터 구조 로깅
  console.log('Inquiry state:', inquiry);

  return (
    <div className="inquiry-detail">
      <h2>Inquiry Detail</h2>
      <p><strong>ID:</strong> {inquiry.inquiryId}</p>
      <p><strong>Title:</strong> {inquiry.title || '(No title)'}</p>
      <p><strong>Content:</strong> {inquiry.content || '(No content)'}</p>
      {/* 모든 필드 출력 (디버깅용) */}
      <pre>{JSON.stringify(inquiry, null, 2)}</pre>
    </div>
  );
};

export default InquiryDetail;