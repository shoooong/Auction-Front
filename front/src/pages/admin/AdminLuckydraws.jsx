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
import { useNavigate } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";

const AdminLuckdraws = () => {
  const [luckyProcessStatus, setLuckyProcessStatus] = useState(""); // default status
  const [luckyDraws, setLuckyDraws] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { exceptionHandler } = useCustomLogin();
  const tabButtons = [
    { label: "READY", value: "READY" },
    { label: "PROCESS", value: "PROCESS" },
    { label: "END", value: "END" },
  ];

  const fetchData = async (status) => {
    try {
      const data = await getLuckys(status);
      setLuckyDraws(data.luckyDraws);
      console.log(status);
    } catch (error) {
      exceptionHandler(error);
      console.error("Error fetching lucky draws:", error);
    }
  };

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      try {
        await fetchData(luckyProcessStatus);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    checkUserAndFetchData();
  }, [navigate, luckyProcessStatus]);

  // CommonList 컴포넌트에 필요한 columns 정의
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
      // flex: 1, // flex 추가
    },
    {
      field: "luckyName",
      headerName: "Name",
      headerAlign: "center", // 헤더 텍스트 가운데 정렬
      width: 150,
      align: "center",
      flex: 2,
    },
    {
      field: "luckyProcessStatus",
      headerName: "Status",
      width: 150,
      headerAlign: "center", // 헤더 텍스트 가운데 정렬

      align: "center",
      flex: 1,
    },
  ];

  // rows 데이터 생성
  const rows = luckyDraws.map((draw, index) => ({
    id: index + 1, // DataGrid에서 필요한 ID 필드
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

  const handleRowClick = async (luckyId) => {};

  return (
    <div className="column-direction h100p">
      <p className="admin-main-title">럭키 드로우 상품</p>
      <div className="service-tab">
        <div className="tabs">
          {tabButtons.map((tab, index) => (
            <div
              className={
                luckyProcessStatus === tab.value ? "tab active" : "tab"
              }
              key={index}
            >
              <button
                className={luckyProcessStatus === tab.value ? "active" : ""}
                onClick={() => setLuckyProcessStatus(tab.value)}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </div>
      </div>
      <CommonList
        rows={rows}
        columns={columns}
        onRowClick={(luckyId) => handleRowClick(luckyId)}
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
          <LuckyDrawForm
            onSubmit={handleFormSubmit}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminLuckdraws;
