import { useState } from "react";
import axios from "axios";

function RegisterAdmin({ setPage }) {

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretCode: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (admin.secretCode !== "BOOKNEST2026") {
      alert("Invalid Admin Secret Code");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username: admin.username,
          email: admin.email,
          password: admin.password,
          role: "admin",
        }
      );

      alert("Admin Registered Successfully!");

      setPage("login");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration Failed"
      );

    }
  };

  return (
    <div className="container">

      <h1>👨‍💼 Register Admin</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={admin.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={admin.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={admin.confirmPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="secretCode"
          placeholder="Admin Secret Code"
          value={admin.secretCode}
          onChange={handleChange}
        />

        <button type="submit">
          Register Admin
        </button>

        <button
          type="button"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>

      </form>

    </div>
  );
}

export default RegisterAdmin;