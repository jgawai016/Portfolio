import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
