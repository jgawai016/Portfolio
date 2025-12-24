import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import Hero from "./Hero";
import AboutMe from '../pages/AboutMe';

function Home() {
  return (
    <div className="hero-section text-white text-center">
      <div className="container">
        <Outlet />
        <Hero />
          <AboutMe />
      </div>
    </div>
  );
}

export default Home;
