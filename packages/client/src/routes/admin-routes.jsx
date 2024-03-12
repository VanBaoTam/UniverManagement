import { Routes, Route } from "react-router-dom";
import ListUserAdmin from "../pages/admin/ListUserAdmin";
import ListClassAdmin from "../pages/admin/ListClassAdmin";
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/list-user" element={<ListUserAdmin />} />
      <Route path="/list-class" element={<ListClassAdmin />} />
    </Routes>
  );
}
export default AdminRoutes;
