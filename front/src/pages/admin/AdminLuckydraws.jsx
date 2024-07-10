import React, { useState, useEffect } from "react";
import { getLuckys, createLucky } from "api/admin/AdminLuckyApi";
import CommonList from "./layout/CommonList"; // CommonList 컴포넌트를 import 합니다.
import LuckyDrawForm from "./LuckyDrawForm";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AdminLuckdraws = () => {
  const [luckyProcessStatus, setLuckyProcessStatus] = useState(""); // default status
  const [luckyDraws, setLuckyDraws] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //기존 럭키드로우 리스트 다운
  const fetchData = async (status) => {
    try {
      const data = await getLuckys(status);
      setLuckyDraws(data.luckyDraws);
      console.log(status);
    } catch (error) {
      console.error("Error fetching lucky draws:", error);
    }
  };

  useEffect(() => {
    fetchData(luckyProcessStatus);
  }, [luckyProcessStatus]);

  // CommonList 컴포넌트에 필요한 columns 정의
  const columns = [
    { field: "luckyId", headerName: "ID", width: 90 },
    { field: "luckyName", headerName: "Name", width: 150 },
    { field: "luckyProcessStatus", headerName: "Status", width: 150 },
  ];

  // rows 데이터 생성
  const rows = luckyDraws.map((draw, index) => ({
    id: index, // DataGrid에서 필요한 ID 필드
    luckyId: draw.luckyId,
    luckyName: draw.luckyName,
    luckyProcessStatus: draw.luckyProcessStatus,
  }));

  //관리자 상품등록
  const handleFormSubmit = async (newLuckyDraw) => {
    try {
      await createLucky(newLuckyDraw); // 새로운 럭키드로우 상품 등록 API 호출
      fetchData(luckyProcessStatus);
    } catch (error) {
      console.error("Error creating lucky draw:", error);
    }
  };

  return (
    <>
      <h1>럭키드로우 상품 리스트!!!!!!!!</h1>
      <div>
        <button onClick={() => setLuckyProcessStatus("READY")}>READY</button>
        <button onClick={() => setLuckyProcessStatus("PROCESS")}>
          PROCESS
        </button>
        <button onClick={() => setLuckyProcessStatus("END")}>END</button>
      </div>
      <CommonList
        rows={rows}
        columns={columns}
        onRowClick={(row) => console.log("Row clicked:", row)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
      >
        상품 등록
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>럭키드로우 상품 등록</DialogTitle>
        <DialogContent>
          <LuckyDrawForm onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminLuckdraws;
