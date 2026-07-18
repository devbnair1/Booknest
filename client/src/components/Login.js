import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    username,
                    password,
                }
            );

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

onLogin(response.data.user);
        } catch (error) {

            alert("Invalid Username or Password");

        }
    };

   return (
  <div className="container">

    <h1>📚 BookNest</h1>

    <p className="subtitle">
      Book Store Management System
    </p>

    <form onSubmit={handleLogin}>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Login
      </button>

    </form>

    <div className="demo-users">
      <h3>Demo Accounts</h3>

      <p><strong>Admin:</strong> admin / admin123</p>

      <p><strong>User:</strong> user / user123</p>
    </div>

  </div>
);
}

export default Login;