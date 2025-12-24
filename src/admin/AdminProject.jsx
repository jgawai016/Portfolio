import { useEffect, useState } from "react";
import "../admin/Admin.css";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    id: null,
    projectName: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: ""
  });

  const API_BASE = "http://localhost:8080/api/project";

  // 🔹 FETCH PROJECTS
  useEffect(() => {
    fetch(`${API_BASE}/getAllProject`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      // UPDATE
      const res = await fetch(`${API_BASE}/update/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const updatedProject = await res.json();

      setProjects(
        projects.map(p =>
          p.id === updatedProject.id ? updatedProject : p
        )
      );
    } else {
      // ADD
      const res = await fetch(`${API_BASE}/saveProject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const newProject = await res.json();
      setProjects([...projects, newProject]);
    }

    // RESET FORM
    setForm({
      id: null,
      projectName: "",
      description: "",
      techStack: "",
      githubLink: "",
      liveLink: ""
    });
  };

  // 🔹 EDIT
  const editProject = (project) => {
    setForm(project);
  };

  // 🔹 DELETE
  const deleteProject = async (id) => {
    await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE"
    });

    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="admin-section">
      <h2>Manage Projects</h2>

      {/* 🔸 FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (React, Spring Boot)"
          value={form.techStack}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={handleChange}
        />

        <input
          type="text"
          name="liveLink"
          placeholder="Live Project Link"
          value={form.liveLink}
          onChange={handleChange}
        />

        <button type="submit">
          {form.id ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* 🔸 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Tech Stack</th>
            <th>Links</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="5">No projects found</td>
            </tr>
          ) : (
            projects.map(project => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>{project.techStack}</td>
                <td>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {" | "}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                </td>
                <td>
                  <button onClick={() => editProject(project)}>Edit</button>
                  <button onClick={() => deleteProject(project.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjects;
