import React, { useState } from "react";

const LuckyDrawForm = ({ onSubmit }) => {
  const [luckyName, setLuckyName] = useState("");
  const [content, setContent] = useState("");
  const [luckyImage, setLuckyImage] = useState("");
  const [luckyPeople, setLuckyPeople] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ luckyName, content, luckyImage, luckyPeople });
    setLuckyName("");
    setContent("");
    setLuckyImage("");
    setLuckyPeople(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>럭키드로우 이름</label>
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
        <label>이미지</label>
        <input
          type="text"
          value={luckyImage}
          onChange={(e) => setLuckyImage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>참여 인원</label>
        <input
          type="number"
          value={luckyPeople}
          onChange={(e) => setLuckyPeople(parseInt(e.target.value, 10))}
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
};

export default LuckyDrawForm;
