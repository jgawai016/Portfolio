import { useEffect, useState } from "react";
import "../admin/Admin.css";

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);

  const [form, setForm] = useState({
    id: null,
    companyName: "",
    role: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const API_BASE = "http://localhost:8080/api/experience";

  // 🔹 FETCH EXPERIENCE
  useEffect(() => {
    fetch(`${API_BASE}/getallExperience`)
      .then(res => res.json())
      .then(data => setExperiences(data))
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

      const updatedExp = await res.json();

      setExperiences(
        experiences.map(exp =>
          exp.id === updatedExp.id ? updatedExp : exp
        )
      );
    } else {
      // ADD
      const res = await fetch(`${API_BASE}/saveExperience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const newExp = await res.json();
      setExperiences([...experiences, newExp]);
    }

    // RESET FORM
    setForm({
      id: null,
      companyName: "",
      role: "",
      description: "",
      startDate: "",
      endDate: ""
    });
  };

  // 🔹 EDIT
  const editExperience = (exp) => {
    setForm(exp);
  };

  // 🔹 DELETE
  const deleteExperience = async (id) => {
    await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE"
    });

    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="admin-section">
      <h2>Manage Experience</h2>

      {/* 🔸 FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role / Position"
          value={form.role}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Work Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <button type="submit">
          {form.id ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      {/* 🔸 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {experiences.length === 0 ? (
            <tr>
              <td colSpan="5">No experience found</td>
            </tr>
          ) : (
            experiences.map(exp => (
              <tr key={exp.id}>
                <td>{exp.companyName}</td>
                <td>{exp.role}</td>
                <td>
                  {exp.startDate} - {exp.endDate || "Present"}
                </td>
                <td>{exp.description}</td>
                <td>
                  <button onClick={() => editExperience(exp)}>Edit</button>
                  <button onClick={() => deleteExperience(exp.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExperience;
