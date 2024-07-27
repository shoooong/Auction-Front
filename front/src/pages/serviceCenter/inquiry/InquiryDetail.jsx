import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil';

const InquiryDetail = ({ inquiryId }) => {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const response = await jwtAxios.get(`/${inquiryId}`);
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

  const { inquiryTitle, inquiryContent, createdDate, response } = inquiry;

  let answer = '답변 대기 중';
  if (response) {
    const match = response.match(/response=([^,\])]*)/);
    if (match) {
      answer = match[1].replace(/[)\]]/, '');
    }
  }

  return (
    <div className="inquiry-detail">
      <h2>문의 상세</h2>
      <div className="inquiry-detail-content">
        <div className="inquiry-item">
          <h3>제목</h3>
          <p>{inquiryTitle}</p>
        </div>
        <div className="inquiry-item">
          <h3>내용</h3>
          <p>{inquiryContent}</p>
        </div>
        <div className="inquiry-item">
          <h3>등록일</h3>
          <p>{new Date(createdDate).toLocaleString()}</p>
        </div>
        <div className="inquiry-item">
          <h3>답변</h3>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
