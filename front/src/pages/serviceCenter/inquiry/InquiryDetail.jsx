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
        const response = await jwtAxios.get(`http://localhost:80/inquiry/${inquiryId}`);
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
    <div className="inquiry-detail">
      <h2>Inquiry Detail</h2>
      <p><strong>ID:</strong> {inquiry.inquiryId}</p>
      <p><strong>Title:</strong> {inquiry.title}</p>
      <p><strong>Content:</strong> {inquiry.content}</p>
    </div>
  );
};

export default InquiryDetail;