import React from "react";

const InquiryItem = ({ inquiry }) => {
    return (
        <div className="inquiry-item">
            <div>
                <h3>{inquiry.inquiryTitle}</h3>
                {/* <p>{inquiry.content}</p> */}

                <p>{inquiry.response ? "답변 완료" : "문의 완료"}</p>
            </div>

            <div>
                <p>{new Date(inquiry.createdDate).toLocaleString()}</p>
                <p>
                    수정일:{" "}
                    {inquiry.modifyDate
                        ? new Date(inquiry.modifyDate).toLocaleString()
                        : "수정된 기록 없음"}
                </p>
            </div>
        </div>
    );
};

export default InquiryItem;
