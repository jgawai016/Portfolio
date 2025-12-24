import { useEffect, useState } from "react";
import "../styles/education.css"

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/education/getEducation")
      .then(res => res.json())
      .then(data => {
        setEducationList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching education:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="education" id="education">
      <h2 className="section-title">Education</h2>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="education-list">
        {educationList.map((edu) => (
          <div className="education-card" key={edu.id}>
            <h3>{edu.degree}</h3>
            <span className="edu-year">{edu.year}</span>
            <p className="edu-institute">{edu.institute}</p>
            <p className="edu-desc">{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
