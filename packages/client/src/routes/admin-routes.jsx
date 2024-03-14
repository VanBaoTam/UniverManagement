import { Routes, Route, Navigate } from "react-router-dom";
import ListUserAdmin from "@pages/admin/user";
import ListClassAdmin from "@pages/admin/class";
import AdminRestrict from "./admin-restrict";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/list-user"
        element={
          <AdminRestrict>
            <ListUserAdmin />
          </AdminRestrict>
        }
      />
      <Route
        path="/list-courses"
        element={
          <AdminRestrict>
            <ListClassAdmin />
          </AdminRestrict>
        }
      />
      <Route path="*" element={<Navigate to="/admin/list-courses" />} />
    </Routes>
  );
}
export default AdminRoutes;
