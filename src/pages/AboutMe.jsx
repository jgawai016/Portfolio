import { useEffect, useState } from "react";
import "../styles/AboutMe.css";
const AboutMe = () => {
  const [about, setAbout] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/about/getabout")
      .then(res => res.json())
      .then(data => setAbout(data.summary))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="about-section" id="about">
      <h2 className="about-title">About Me</h2>

      <p className="about-text m-4">
        {about || "Loading..."}
      </p>

      <a
        href="/resume/JyotiResume.pdf"
        download
        className="resume-btn border border-primary p-1"
        style={{textDecoration:'none'}}
      >
        Download Resume
      </a>

    </section>

    
  );
};

export default AboutMe;
