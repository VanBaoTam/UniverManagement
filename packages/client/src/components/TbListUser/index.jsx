import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { RED_COLOR } from "@constants/color";
import { useDataProvider } from "@services";
import UserContext from "@contexts/user";

export default function TableListClass() {
    const provider = useDataProvider();
    const { user } = useContext(UserContext) ?? {};
 const [users, setUsers] = useState([]);

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
     } catch (error) {
       console.error("Error fetching users:", error);
     }
   };

   fetchUsers();
 }, []);

    const handleChangeStatus = async (accountId, newStatus) => {
      try {
        console.log(accountId);
        console.log(newStatus);

        await provider.get({
          path: `admin/change-status-account/${accountId}/${newStatus}`,

          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        });

        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.accountId === accountId) {
              return { ...user, status: newStatus };
            }
            return user;
          });
        });
      } catch (error) {
        console.error("Error changing status:", error);
      }
    };
 const columns = [
   { field: "accountId", headerName: "Account ID", width: 150 },
   { field: "role", headerName: "Role", width: 150 },
   { field: "name", headerName: "Name", width: 200 },
   { field: "email", headerName: "Email", width: 250 },
   { field: "phoneNumber", headerName: "Phone Number", width: 200 },
   {
     field: "status",
     headerName: "Status",
     width: 150,
     renderCell: (params) => (
       <button
         onClick={() =>
           handleChangeStatus(
             user.accountId,
             user.status === "active" ? "active" : "active"
           )
         }
       >
         {user.status === "active" ? "Deactivate" : "Activate"}
       </button>
     ),
   },
 ];



  return (
    <Paper sx={{ mt: 3, overflowX: "auto", maxWidth: 1200 }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {/* <div style={{ Width: 960 }}>
        <DataGrid
          rows={userRow}
          columns={[
            ...userCols,
            {
              field: "action",
              headerName: "Thao Tác",
              renderCell: renderButtonCell,
            },
          ]}
          pageSizeOptions={[10, 100]}
        />
      </div> */}
    </Paper>
  );
}
