import React from 'react';

const NoticeDetailContent = ({ notice, onEdit, onDelete }) => {
  return (
    <div className="notice-detail-content">
      <h2>{notice.noticeTitle}</h2>
      <p className="notice-info">
        <span>작성일: {notice.createdAt}</span>
      </p>
      <div className="notice-content">{notice.noticeContent}</div>
      <div className="notice-actions">
        <button onClick={onEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
};

export default NoticeDetailContent;