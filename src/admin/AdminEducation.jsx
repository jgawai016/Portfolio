import { useEffect, useState } from "react";
import "../admin/Admin.css";

const AdminEducation = () => {
  const [educations, setEducations] = useState([]);

  const [form, setForm] = useState({
    id: null,
    degree: "",
    college: "",
    year: "",
    percentage: ""
  });

  const API_BASE = "http://localhost:8080/api/education";

  // 🔹 FETCH DATA
  useEffect(() => {
    fetch(`${API_BASE}/getEducation`)
      .then(res => res.json())
      .then(data => setEducations(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 HANDLE INPUT CHANGE
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

      const updatedEdu = await res.json();

      setEducations(
        educations.map(edu =>
          edu.id === updatedEdu.id ? updatedEdu : edu
        )
      );
    } else {
      // ADD
      const res = await fetch(`${API_BASE}/saveEducation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const newEdu = await res.json();
      setEducations([...educations, newEdu]);
    }

    // RESET FORM
    setForm({
      id: null,
      degree: "",
      college: "",
      year: "",
      percentage: ""
    });
  };

  // 🔹 EDIT
  const editEducation = (edu) => {
    setForm(edu);
  };

  // 🔹 DELETE
  const deleteEducation = async (id) => {
    await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE"
    });

    setEducations(educations.filter(edu => edu.id !== id));
  };

  return (
    <div className="admin-section">
      <h2>Manage Education</h2>

      {/* 🔸 FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="degree"
          placeholder="Degree (B.E / M.Sc)"
          value={form.degree}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={form.college}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="year"
          placeholder="Year (2018)"
          value={form.year}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="percentage"
          placeholder="Percentage / CGPA"
          value={form.percentage}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {form.id ? "Update Education" : "Add Education"}
        </button>
      </form>

      {/* 🔸 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Degree</th>
            <th>College</th>
            <th>Year</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {educations.length === 0 ? (
            <tr>
              <td colSpan="5">No education records found</td>
            </tr>
          ) : (
            educations.map(edu => (
              <tr key={edu.id}>
                <td>{edu.degree}</td>
                <td>{edu.college}</td>
                <td>{edu.year}</td>
                <td>{edu.percentage}</td>
                <td>
                  <button onClick={() => editEducation(edu)}>Edit</button>
                  <button onClick={() => deleteEducation(edu.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEducation;
