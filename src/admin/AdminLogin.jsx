import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const admin = await res.json();

      // Save session
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminUser", admin.username);

      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login">
      <h2 className="me-5">Admin Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
