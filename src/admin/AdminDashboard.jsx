import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "./Admin.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const goTo = (path) => navigate(path);

  return (
    <div className="admin-dashboard">

      <h2 className="dashboard-title">
        Welcome, {localStorage.getItem("adminUser")}
      </h2>

      {/* ABOUT */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>About Me</h3>
          <FaEdit onClick={() => goTo("/admin/about")} />
        </div>
        <p>Manage your profile summary</p>
      </section>

      <hr />

      {/* SKILLS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>Skills</h3>
          <FaEdit onClick={() => goTo("/admin/skills")} />
        </div>
        <p>Add / update your technical skills</p>
      </section>

      <hr />

      {/* EDUCATION */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>Education</h3>
          <FaEdit onClick={() => goTo("/admin/education")} />
        </div>
        <p>Manage education details</p>
      </section>

      <hr />

      {/* PROJECTS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>Projects</h3>
          <FaEdit onClick={() => goTo("/admin/projects")} />
        </div>
        <p>Showcase your projects</p>
      </section>

      <hr />

      {/* EXPERIENCE */}
      <section className="dashboard-section">
        <div className="section-header">
          <h3>Experience</h3>
          <FaEdit onClick={() => goTo("/admin/experience")} />
        </div>
        <p>Manage work experience</p>
      </section>

    </div>
  );
};

export default AdminDashboard;
