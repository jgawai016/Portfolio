import { useEffect, useState } from "react";
import "../admin/Admin.css";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    id: null,
    skillName: "",
    category: "",
    proficiency: ""
  });

  const API_GET = "http://localhost:8080/api/skills/getskills";
  const API_BASE = "http://localhost:8080/api/skills";

  // Fetch skills
  useEffect(() => {
    console.log("AdminSkills loaded");

    fetch(API_GET)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update skill
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      // UPDATE
     const res = await fetch(`${API_BASE}/update/${form.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});

const updatedSkill = await res.json();

setSkills(
  skills.map(s => (s.id === updatedSkill.id ? updatedSkill : s))
);

    } else {
      // ADD
      const res = await fetch(`${API_BASE}/saveSkills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const newSkill = await res.json();
      setSkills([...skills, newSkill]);
    }

    setForm({
      id: null,
      skillName: "",
      category: "",
      proficiency: ""
    });
  };

  // Edit
  const editSkill = (skill) => {
    setForm(skill);
  };

  // Delete
  const deleteSkill = async (id) => {
    await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE"
    });
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <div className="admin-section">
      <h2>Manage Skills</h2>

      {/* FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="skillName"
          placeholder="Skill Name"
          value={form.skillName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (Frontend / Backend)"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="proficiency"
          placeholder="Proficiency (Beginner / Intermediate / Advanced)"
          value={form.proficiency}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {form.id ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Category</th>
            <th>Proficiency</th>
            <th>Actions</th>
          </tr>
        </thead>
       <tbody>
        {skills.length > 0 ? (
          skills.map(skill => (
            <tr key={skill.id}>
              <td>{skill.skillName}</td>
              <td>{skill.category}</td>
              <td>{skill.proficiency}</td>
              <td>
                <button onClick={() => editSkill(skill)}>Edit</button>
                <button onClick={() => deleteSkill(skill.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No skills found</td>
          </tr>
        )}
      </tbody>


      </table>
    </div>
  );
};

export default AdminSkills;
