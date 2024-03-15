import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { RED_COLOR } from "@constants/color";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";
import { MAIN_COLOR } from "../../constants/color";

export default function TableListClass() {
  const provider = useDataProvider();
  const { user } = useContext(UserContext) ?? {};
  const [users, setUsers] = useState([]);
  const columns = [
    { field: "id", headerName: "Mã user", width: 90 },
    { field: "name", headerName: "Họ tên", width: 240 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 120 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ background: MAIN_COLOR, color: "black" }}
          onClick={() => handleChangeStatus(params.row.id, params.row.status)}
        >
          Change Status
        </Button>
      ),
    },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await provider.get({
          path: `admin/get-user`,

          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        });
        setUsers(response.data.userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeStatus = async (accountId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "in_active" : "active";
      //console.log(accountId);
      //console.log(newStatus);

      await provider.get({
        path: `admin/change-status-account/${accountId}`,
        status: newStatus,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      });

      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === accountId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
      });
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  return (
    <React.Fragment>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ px: 3 }}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
}
