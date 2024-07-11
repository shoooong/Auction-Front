import React from 'react';

const InquiryItem = ({ date, category, status, description }) => {
    return (
        <div className="inquiry-item">
            <span className="date">{date}7월 10일</span>
            <span className="category">{category}구매</span>
            <span className="status">{status}답변 완료</span>
            <p className="description">{description}설명</p>
        </div>
    );
};

export default InquiryItem;
