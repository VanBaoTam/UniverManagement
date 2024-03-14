import { Routes, Route, Navigate } from "react-router-dom";
import ListUserAdmin from "@pages/admin/user";
import ListClassAdmin from "@pages/admin/class";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/list-user" element={<ListUserAdmin />} />
      <Route path="/list-class" element={<ListClassAdmin />} />
      <Route path="*" element={<Navigate to="/admin/list-class" />} />
    </Routes>
  );
}
export default AdminRoutes;
