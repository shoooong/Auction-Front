import React, { useState } from 'react';
import '../../../styles/inquiryRegistration.css'

const InquiryForm = () => {
    const [inquiryType, setInquiryType] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        if (images.length < 3) {
            const file = event.target.files[0];
            if (file) {
                setImages([...images, URL.createObjectURL(file)]);
            }
        }
    };

    const handleSubmit = () => {
        // 문의 저장 로직 구현
    };

    return (
        <div className="inquiry-form">
            <header className="header">
                <button className="back-button">&lt;</button>
                <h1 className="title">문의하기</h1>
                <button className="cancel-button">취소</button>
            </header>

            <div className="form-group">
                <label className="label">문의 유형</label>
                <select
                    className="select"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                >
                    <option value="">선택하세요.</option>
                    <option value="구매">구매</option>
                    <option value="배송">배송</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div className="form-group">
                <label className="label">문의 내용</label>
                <input
                    className="input"
                    type="text"
                    placeholder="제목을 입력하세요. (최대 80자)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="문의 내용을 입력하세요. (최대 1500자)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="label">이미지 첨부</label>
                <div className="image-upload">
                    <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/heic"
                        onChange={handleImageUpload}
                    />
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`upload-${index}`} className="uploaded-image" />
                    ))}
                </div>
                <p className="note">이미지는 JPEG, JPG, PNG, HEIC만 가능하며 최대 3개까지 첨부 가능합니다.</p>
            </div>

            <button className="submit-button" onClick={handleSubmit}>저장하기</button>
        </div>
    );
};

export default InquiryForm;
