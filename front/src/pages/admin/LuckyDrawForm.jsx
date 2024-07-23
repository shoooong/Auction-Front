import React, { useState } from "react";

const LuckyDrawForm = ({ onSubmit, onClose }) => {
  const [luckyName, setLuckyName] = useState("");
  const [content, setContent] = useState("");
  const [luckyPhoto, setLuckyPhoto] = useState(null);
  const [luckyPeople, setLuckyPeople] = useState(0);
  const [preview, setPreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("luckyName", luckyName);
    formData.append("content", content);
    formData.append("luckyphoto", luckyPhoto);
    formData.append("luckyPeople", luckyPeople);

    onSubmit(formData);

    // Reset form fields
    setLuckyName("");
    setContent("");
    setLuckyPhoto(null);
    setLuckyPeople(0);
    setPreview(null);
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLuckyPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="admin-form-wrapper">
      <div className="admin-image" onClick={triggerFileInput}>
        {preview ? (
          <img src={preview} alt="이미지 미리보기" />
        ) : (
          <img src="/path/to/default/image.png" alt="파일 선택" />
        )}
      </div>
      <form className="admin-form-container" onSubmit={handleSubmit}>
        <h2>럭키 상품 등록</h2>
        <div>
          <label>상품명</label>
          <input
            type="text"
            value={luckyName}
            onChange={(e) => setLuckyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>당첨 인원</label>
          <input
            type="number"
            value={luckyPeople}
            onChange={(e) => setLuckyPeople(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
          required
        />
        <button type="submit">럭키 상품 등록</button>
      </form>
    </div>
  );
};

export default LuckyDrawForm;
