import React from 'react';

const InquiryDetail = ({ inquiry }) => {
  return (
    <div className="inquiry-detail">
      <h2>Inquiry Detail</h2>
      <p><strong>ID:</strong> {inquiry.inquiryId}</p>
      <p><strong>Title:</strong> {inquiry.title}</p>
      <p><strong>Content:</strong> {inquiry.content}</p>
      {/* 추가적인 상세 정보 표시 */}
    </div>
  );
};

export default InquiryDetail;
