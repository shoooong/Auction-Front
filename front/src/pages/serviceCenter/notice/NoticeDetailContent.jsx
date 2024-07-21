import React from "react";

const NoticeDetailContent = ({ notice, onEdit, onDelete }) => {
    return (
        <div className="notice-detail-content">
            <div className="align-center space-between">
                <h2>{notice.noticeTitle}</h2>
                <span>{notice.createDate}</span>
            </div>

            <div className="content">{notice.noticeContent}</div>
            <div className="notice-actions">
                <button onClick={onEdit}>수정</button>
                <button onClick={onDelete}>삭제</button>
            </div>
        </div>
    );
};

export default NoticeDetailContent;
