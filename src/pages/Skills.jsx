import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch("http://localhost:8080/api/skills/getskills") // ✅ CORRECT URL
    .then(res => res.json())
    .then(data => {
      setSkills(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching skills:", err);
      setLoading(false);
    });
}, []);


  return (
    <section className="skills" id="skills">
      <h2 className="section-title">Skills</h2>

      {loading ? (
        <p className="loading-text">Loading skills...</p>
      ) : (
        <div className="skills-grid">
          {skills.map(skill => (
            <div className="skill-card" key={skill.id}>
              <h3>{skill.skillName}</h3>
              <p className="text-light">{skill.category}</p>
              <span>{skill.proficiency}/100</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
