import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CommonList = ({ rows, columns, onRowClick, loading }) => {
  return (
    <Box className="align-center h100p">
      <DataGrid
        className="table"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
        pageSizeOptions={[5, 10]}
        disableColumnMenu
        onRowClick={(params) => onRowClick(params.row)}
        sx={{
          // boxShadow: 2,
          // border: 2,
          // borderColor: "borderBasic.light",
          "& .MuiDataGrid-cell:hover": {
            color: "borderBasic.main",
          },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "--DataGrid-overlayHeight": "600px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f2f2f2",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
};

export default CommonList;
