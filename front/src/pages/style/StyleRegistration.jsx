import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import jwtAxios from "utils/jwtUtil";

import useCustomLogin from "hooks/useCustomLogin";

const FeedRegistrationForm = () => {
    const [feedTitle, setFeedTitle] = useState("");
    const [feedImage, setFeedImage] = useState(null);
    const { exceptionHandler } = useCustomLogin();
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅 추가

    const handleImageChange = (event) => {
        setFeedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("feedTitle", feedTitle);
        formData.append("files", feedImage);

        try {
            const response = await jwtAxios.post(`/user/feedRegistration`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Feed registered successfully:", response.data);
            setFeedTitle("");
            setFeedImage(null);
            navigate('/style'); // 등록 후 리다이렉션
        } catch (error) {
            exceptionHandler(error);
            setError("정보를 불러오는 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="container feed-registration-form">
            <form onSubmit={handleSubmit}>
                <h2>피드 등록</h2>
                <div className="form-group">
                    <label htmlFor="feedTitle">피드 제목:</label>
                    <input
                        type="text"
                        id="feedTitle"
                        value={feedTitle}
                        onChange={(e) => setFeedTitle(e.target.value)}
                        required
                        placeholder="제목을 입력해주세요"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedImage">피드 이미지:</label>
                    <input
                        type="file"
                        id="feedImage"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                        placeholder="파일을 선택해주세요"
                    />
                </div>
                <div className="text-center" style={{ marginBottom: "80px" }}>
                    <button type="submit" className="small-btn">
                        등록
                    </button>
                    <Link to="/style">
                        <button type="button" className="small-btn">목록으로</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default FeedRegistrationForm;
