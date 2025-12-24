import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../../src/styles/project.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/project/getAllProject")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="projects-section">
      <h2 className="projects-title">Projects</h2>

      {projects.map((p, index) => (
        <div
          className={`project-row ${index % 2 !== 0 ? "reverse" : ""}`}
          key={p.id}
        >
          {/* LEFT / RIGHT IMAGE */}
          <div className="project-image">
            <span>{p.projectName}</span>
          </div>

          {/* CONTENT */}
          <div className="project-content">
            <h3>{p.projectName}</h3>
            <p>{p.description}</p>

            <div className="tech">
              <span>React</span>
              <span>Spring Boot</span>
              <span>MySQL</span>
            </div>

            <div className="links">
              <a href={p.githubLink} target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a href={p.liveLink} target="_blank" rel="noreferrer">
                Live →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;
