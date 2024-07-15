import React from 'react';
import { Link } from 'react-router-dom';
import InquiryItem from './InquiryItem';

const InquiryItemList = ({ inquiries }) => {
  return (
    <div className="inquiry-list">
      {inquiries.map((inquiry) => (
        <Link key={inquiry.inquiryId} to={`/service/inquiry/${inquiry.inquiryId}`} className="inquiry-item">
          <InquiryItem inquiry={inquiry} />
        </Link>
      ))}
    </div>
  );
};

export default InquiryItemList;
