import { useState } from "react";
import "../styles/navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">Jyoti Gawai</div>

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="/project" onClick={() => setMenuOpen(false)}>Project</a></li>
        <li><a href="/experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
        <li><a href="/education" onClick={() => setMenuOpen(false)}>Education</a></li>
        <li><a href="/skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
        <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        <li><a href="/admin" onClick={() => setMenuOpen(false)}>Admin</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
