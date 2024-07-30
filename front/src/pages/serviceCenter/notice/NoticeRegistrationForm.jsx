import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import jwtAxios from 'utils/jwtUtil';
import './NoticeRegistration.css';

const NoticeRegistrationForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('notice');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await jwtAxios.post(`/user/noticeRegistration`, {
        noticeTitle: title,
        noticeContent: content,
        noticeType: type
      });
      
      if (response.status === 200) {
        setMessage('등록 완료되었습니다.');
        setTitle('');
        setContent('');
        setType('notice');
        setTimeout(() => {
          navigate('/admin/notice');
        }, 100);
      } else {
        setMessage('공지사항 등록에 실패했습니다.');
        navigate('/admin/notice');
      }
    } catch (error) {
      console.error('Error registering notice:', error);
      setMessage('공지사항 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      {message && <div className="message">{message}</div>}
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
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default NoticeRegistrationForm;
