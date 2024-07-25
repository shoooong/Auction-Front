import React, { useState } from "react";
import { Link } from "react-router-dom";
import jwtAxios from "pages/user/jwtUtil";
import { SERVER_URL } from "../../../api/serverApi";

const InquiryRegistration = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await jwtAxios.post(
                `/api/user/registration`,
                {
                    inquiryTitle: title,
                    inquiryContent: content,
                }
            );

            if (response.status === 201) {
                console.log("Inquiry successfully submitted");
                setSuccess(true);
            } else {
                const errorData = response.data;
                console.error("Failed to submit inquiry:", errorData);
                setError("문의 등록에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            setError("문의 등록 중 오류가 발생했습니다.");
        }
    };

    if (success) {
        return (
            <div className="inquiry-registration">
                <h2>문의 등록 완료</h2>
                <p>문의가 성공적으로 등록되었습니다.</p>
                <Link to="/service/inquiry">
                    <div className="text-center">
                        <button className="cancel-btn">목록으로</button>
                    </div>
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
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    내용:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>

                <div className="btn-box text-center">
                    <button type="submit" className="confirm-btn">
                        문의 등록
                    </button>
                    <Link to="/service/inquiry">
                        <button className="cancel-btn">목록으로</button>
                    </Link>
                </div>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InquiryRegistration;
