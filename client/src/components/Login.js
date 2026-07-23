import { useState } from "react";
import axios from "axios";

function Login({ onLogin, setPage }) {

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

export default Login;