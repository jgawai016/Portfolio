import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import Navbar from './Navbar';
import Education from '../pages/Education';
import Projects from '../pages/Project';
import Experience from '../pages/Experience';
import AdminDashboard from '../admin/AdminDashboard';
import AdminLayout from '../admin/AdminLayout';
import AdminSkills from '../admin/AdminSkills';
import AdminEducation from '../admin/AdminEducation';
import AdminProjects from '../admin/AdminProject';
import AdminExperience from '../admin/AdminExperience';
import AboutMe from '../pages/AboutMe';
import AdminLogin from '../admin/AdminLogin';
import ProtectedRoute from '../routes/ProtectedRoute';

const PortRouter = ( )=> {

  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<AboutMe/>}></Route>
        <Route path="/skills" element={<Skills />}></Route>
        <Route path="/education" element={<Education />}></Route>
        <Route path="/project" element={<Projects />}></Route>
        <Route path="/experience" element={<Experience />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="education" element={<AdminEducation />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="experience" element={<AdminExperience />} />
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default PortRouter