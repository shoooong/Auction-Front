import React, { useState, useEffect } from 'react';
import jwtAxios from 'pages/user/jwtUtil';

const AdminInquiryDetail = ({ inquiryId }) => {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');
  const [responseStatus, setResponseStatus] = useState('');

  useEffect(() => {
    fetchInquiry();
  }, [inquiryId]);

  const fetchInquiry = async () => {
    try {
      setLoading(true);
      const response = await jwtAxios.get(`/admin/${inquiryId}`);
      setInquiry(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching inquiry:', error);
      setError('Failed to load inquiry details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    try {
      await jwtAxios.post(`/inquiryResponseRegistration/${inquiryId}`, { response });
      setResponseStatus('답변이 성공적으로 등록되었습니다.');
      fetchInquiry();
      setResponse('');
    } catch (error) {
      console.error('Error submitting response:', error);
      setResponseStatus('답변 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const extractResponse = (responseString) => {
    if (!responseString) return null;
    const match = responseString.match(/response=([^)\]]+)/);
    return match ? match[1] : null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!inquiry) return <div>No inquiry found</div>;

  const extractedResponse = extractResponse(inquiry.response);

  return (
    <div className="admin-inquiry-detail">
      <h2>관리자 전용 1대1 문의 상세</h2>
      <p><strong>ID:</strong> {inquiry.inquiryId}</p>
      <p><strong>제목:</strong> {inquiry.inquiryTitle}</p>
      <p><strong>내용:</strong> {inquiry.inquiryContent}</p>
      <p><strong>작성자:</strong> {inquiry.userId}</p>
      <p><strong>작성일:</strong> {new Date(inquiry.createdDate).toLocaleString()}</p>
      <p><strong>상태:</strong> {extractedResponse ? '답변 완료' : '답변 대기'}</p>

      {extractedResponse && (
        <div>
          <h3>등록된 답변:</h3>
          <p>{extractedResponse}</p>
        </div>
      )}

      <h3>답변 등록</h3>
      <form onSubmit={handleResponseSubmit}>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="답변을 입력하세요"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">답변 등록</button>
      </form>

      {responseStatus && <p>{responseStatus}</p>}
    </div>
  );
};

export default AdminInquiryDetail;