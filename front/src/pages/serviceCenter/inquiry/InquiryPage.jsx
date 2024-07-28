import React from "react";
import { Link } from "react-router-dom";

import InquiryListContainer from "./InquiryListContainer";

const InquiryPage = () => {
    return (
        <div className="inquiry-registration pos-relative">
            <h2>1:1 문의</h2>
            <Link to="/service/inquiryRegistration">
                <button className="small-btn title-btn">문의하기</button>
            </Link>
            <InquiryListContainer />
        </div>
    );
};

export default InquiryPage;
