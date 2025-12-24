import { useEffect, useState } from "react";
import "../styles/experience.css";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/experience/getallExperience") // 🔴 Update URL as per your backend
      .then(res => res.json())
      .then(data => {
        setExperience(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching experience:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>

      {loading ? (
        <p className="loading-text">Loading experience...</p>
      ) : (
        <div className="exp-list">
          {experience.map(exp => (
            <div className="exp-card" key={exp.id}>
              <h3>{exp.role}</h3>
              <p className="exp-company">{exp.company}</p>
              <span className="exp-duration">{exp.duration}</span>
              <p className="exp-desc">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;
