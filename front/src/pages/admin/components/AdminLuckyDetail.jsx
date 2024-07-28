import { useState } from "react";

import { getLucky } from "api/admin/AdminLuckyApi";

const AdminLuckyDetail = () => {
  const [luckyId, setLuckId] = useState();
  const [luckyDraw, setLuckyDraw] = useState();

  const fetchData = async (luckyId) => {
    try {
      const data = await getLucky(luckyId);
      setLuckyDraw(data.luckyDraw);
      console.log(data);
    } catch (error) {
      console.error("Error fetching lucky draw:", error);
    }
  };

  return (
    <div className="column-direction">
      <div>
        <span>luckyId</span>
      </div>
      <div>
        <span>luckyName</span>
      </div>
      <div>
        <span>content</span>
      </div>
      <div>
        <span>luckyImage</span>
      </div>
      <div>
        <span>luckyStartDate</span>
      </div>
      <div>
        <span>luckyEndDate</span>
      </div>
      <div>
        <span>luckyDate</span>
      </div>
      <div>
        <span>luckyPeople</span>
      </div>
    </div>
  );
};
export default AdminLuckyDetail;
