import React from 'react';
import { Link } from 'react-router-dom';
import InquiryItem from './InquiryItem';

const AdminInquiryItemList = ({ inquiries }) => {
  return (
    <div className="admin-inquiry-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.inquiryId}>
              <td>{inquiry.inquiryId}</td>
              <td>{inquiry.title}</td>
              <td>{inquiry.userId}</td>
              <td>{new Date(inquiry.createdDate).toLocaleString()}</td>
              <td>{inquiry.response ? '답변 완료' : '답변 대기'}</td>
              <td>
                <Link to={`/admin/inquiry/${inquiry.inquiryId}`}>
                  상세보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInquiryItemList;
