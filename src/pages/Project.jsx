import { useEffect, useState } from "react";
import "../styles/project.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/project/getAllProject") // 🔴 backend URL check kar
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projects</h2>

      {loading ? (
        <p className="loading-text">Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              
              <h3>{project.title}</h3>

              <p className="project-desc">
                {project.description}
              </p>

              <p className="project-tech">
                <span>Tech:</span> {project.techStack}
              </p>

              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
