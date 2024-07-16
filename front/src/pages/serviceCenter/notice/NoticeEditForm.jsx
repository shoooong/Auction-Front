import React, { useState } from 'react';

const NoticeEditForm = ({ notice, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(notice.noticeTitle);
  const [content, setContent] = useState(notice.noticeContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...notice, noticeTitle: title, noticeContent: content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">수정 완료</button>
      <button type="button" onClick={onCancel}>취소</button>
    </form>
  );
};

export default NoticeEditForm;