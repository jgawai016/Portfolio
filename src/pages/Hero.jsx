import "../../src/styles/hero.css";

function Hero() {
  return (
  <section className="hero" id="home">
  <div className="hero-content">
 <div style={{float:'right',paddingLeft:'20px'}}>
          <img
        src="/image/img948.jpg"
        alt="Jyoti Gawai"
        className="profile-img"
      />
      </div>
    <h1>
      Hi, I'm <span>Jyoti Gawai</span>
    </h1>

    <h2>Java Full Stack Developer</h2>

    <p>
      I build scalable backend systems and clean, responsive frontend
      applications using Java, Spring Boot, React and modern web technologies.
    </p>

    <div className="hero-buttons">
      <a href="/project" className="btn primary">View Projects</a>
      <a href="/contact" className="btn secondary">Contact Me</a>
    </div>

  </div>
</section>


  );
}

export default Hero;
