import { useState } from "react";
import axios from "axios";

function Register({ setPage }) {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    await axios.post(
      "http://localhost:5000/api/users/register",
      {
        username: user.username,
        email: user.email,
        password: user.password,
        role: "user",
      }
    );

    alert("Registration Successful!");

    setPage("login");

  } catch (error) {

    alert(
      error.response?.data?.message || "Registration Failed"
    );

  }
};

  return (
    <div className="container">

      <h1>📝 Register User</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">
          Register
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

export default Register;