import { NavLink } from "react-router-dom";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">Admin</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/skills">Skills</NavLink>
        <NavLink to="/admin/education">Education</NavLink>
        <NavLink to="/admin/projects">Projects</NavLink>
        <NavLink to="/admin/experience">Experience</NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </aside>
  );
};

export default AdminSidebar;
