import React from "react";
import { Link } from "react-router-dom";

import InquiryItem from "./InquiryItem";

const InquiryItemList = ({ inquiries }) => {
    return (
        <div className="inquiry-list">
            {inquiries.map((inquiry) => (
                <div>
                    <Link
                        key={inquiry.inquiryId}
                        to={`/service/inquiry/${inquiry.inquiryId}`}
                    >
                        <InquiryItem inquiry={inquiry} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default InquiryItemList;
