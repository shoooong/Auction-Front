// src/components/NoticeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:80/notice/notice/${noticeId}`)
            .then(response => {
                setNotice(response.data);
            })
            .catch(error => {
                console.error('Error fetching notice details:', error);
            });
    }, [noticeId]);

    if (!notice) {
        return <div>Loading...</div>;
    }

    return (
        <section className="notice-detail">
            <h1>{notice.noticeTitle}</h1>
            <p>{notice.noticeContent}</p>
            <p>Created at: {new Date(notice.createDate).toLocaleString()}</p>
            {notice.modifiedDate && <p>Last modified: {new Date(notice.modifiedDate).toLocaleString()}</p>}
        </section>
    );
};

export default NoticeDetail;
