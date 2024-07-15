import React from 'react';

const InquiryItem = ({ inquiry }) => {
  return (
    <div className="inquiry-item">
      <h3>{inquiry.title}</h3>
      <p>{inquiry.content}</p>
      <p>작성일: {new Date(inquiry.createdDate).toLocaleString()}</p>
      <p>수정일: {inquiry.modifyDate ? new Date(inquiry.modifyDate).toLocaleString() : '수정된 기록 없음'}</p>
      <p>상태: {inquiry.response ? '답변 완료' : '문의 완료'}</p>
    </div>
  );
};

export default InquiryItem;
