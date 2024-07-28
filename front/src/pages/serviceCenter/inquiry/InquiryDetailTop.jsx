import React from "react";
import { Link, useParams } from "react-router-dom";

import InquiryDetail from "./InquiryDetail";

const InquiryDetailPage = () => {
    const { inquiryId } = useParams();

    return (
        <div className="inquiry-registration">
            <InquiryDetail inquiryId={inquiryId} />

            <div className="text-center">
                <Link to="/service/inquiry" className="btn add-btn">
                    목록으로 돌아가기
                </Link>
            </div>
        </div>
    );
};

export default InquiryDetailPage;
