import React from 'react';
import { Link, useParams } from 'react-router-dom';
import InquiryDetail from './InquiryDetail';

const InquiryDetailPage = () => {
  const { inquiryId } = useParams();

  return (
    <div className="inquiry-detail-page">
      <h1>문의 상세</h1>
      
      <InquiryDetail inquiryId={inquiryId} />
      
      <div className="navigation-buttons">
        <Link to="/service/inquiry" className="back-button">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default InquiryDetailPage;