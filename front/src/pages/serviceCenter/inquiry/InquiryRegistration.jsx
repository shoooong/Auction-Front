import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jwtAxios from 'pages/user/jwtUtil'; // jwtAxios 모듈 import

const InquiryRegistration = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await jwtAxios.post('http://localhost:80/inquiry/user/registration', {
                inquiryTitle: title,
                inquiryContent: content,
            });

            if (response.status === 201) {
                console.log('Inquiry successfully submitted');
                setSuccess(true);
            } else {
                const errorData = response.data;
                console.error('Failed to submit inquiry:', errorData);
                setError('문의 등록에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setError('문의 등록 중 오류가 발생했습니다.');
        }
    };

    if (success) {
        return (
            <div className="inquiry-registration">
                <h2>문의 등록 완료</h2>
                <p>문의가 성공적으로 등록되었습니다.</p>
                <Link to="/serviceCenter/inquiry" className="back-button">
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="inquiry-registration">
            <h2>1대1 문의 등록</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    내용:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <button type="submit">문의 등록</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <Link to="/serviceCenter/inquiry" className="back-button">
                목록으로 돌아가기
            </Link>
        </div>
    );
};

export default InquiryRegistration;
